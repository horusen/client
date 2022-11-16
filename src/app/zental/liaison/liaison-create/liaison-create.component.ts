import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { PaysService } from "../../pays/pays.service";
import { LiaisonService } from "../liaison.service";

@Component({
  selector: "app-liaison-create",
  templateUrl: "./liaison-create.component.html",
  styleUrls: ["./liaison-create.component.scss"],
})
export class LiaisonCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  ambassade: any;
  dependancies = {
    ambassades: [],
    pays: [],
    consulats: [],
    lierA: ["CONSULAT", "AMBASSADE"],
  };
  dependanciesLoading = {
    ambassades: false,
    pays: false,
    consulats: false,
  };
  constructor(
    public liaisonService: LiaisonService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService
  ) {
    super(liaisonService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getPays();
  }

  initialiseForm(liaison?: any): void {
    // Form Initialisation
    this.form = this.fb.group({
      pays_origine: [
        liaison?.pays_origine
          ? [liaison.pays_origine]
          : this.parent.item.entite_diplomatique.pays_origine.id,
        Validators.required,
      ],
      pays_siege: [
        liaison?.pays_siege ? [liaison.pays_siege] : null,
        Validators.required,
      ],
      lierA: [null, Validators.required],
      date_creation: [
        liaison ? liaison.date_creation : null,
        Validators.required,
      ],
      consulat: [liaison?.consulat ? [liaison.consulat] : []],
      ambassade: [liaison?.ambassade ? [liaison.ambassade] : []],
    });

    // Set and remove validators
    this.form.controls.lierA.valueChanges.subscribe({
      next: (value) => {
        if (value === "AMBASSADE") {
          this.addValidators("ambassade", [Validators.required]);
          this.removeValidators("consulat");
        } else if (value === "CONSULAT") {
          this.addValidators("consulat", [Validators.required]);
          this.removeValidators("ambassade");
        }
      },
    });

    if (this.parent.name === "ministere") {
      this.form.controls.lierA.valueChanges.subscribe({
        next: (value) => {
          if (value === "AMBASSADE") {
            this.getAmbassadesByMinistere(this.parent.item.id);
            this.formValuePatcher("consulat", []);
          } else if (value === "CONSULAT") {
            this.getConsulatsByMinistere(this.parent.item.id);
            this.formValuePatcher("ambassade", []);
          }
        },
      });
    } else if (this.parent.name === "ambassade") {
      this.form.controls.lierA.valueChanges.subscribe({
        next: (value) => {
          if (value === "AMBASSADE") {
            this.formValuePatcher("ambassade", [this.parent.item]);
          } else if (value === "CONSULAT") {
            this.getConsulatsByAmbassade(this.parent.item.id);
          }
        },
      });
    } else if (this.parent.name === "consulat") {
      this.formValuePatcher("consulat", [this.parent.item]);
    }

    if ((liaison && liaison.consulat) || this.parent.name === "consulat") {
      this.formValuePatcher("lierA", "CONSULAT");
    } else {
      this.formValuePatcher("lierA", "AMBASSADE");
    }
  }

  getAmbassadesByMinistere(ministere: number): void {
    this.dependanciesLoading.ambassades = true;
    this.ambassadeService
      .getByMinistere(ministere, {}, false)
      .subscribe((ambassades) => {
        this.dependancies.ambassades = ambassades;
        this.dependanciesLoading.ambassades = false;
      });
  }

  getConsulatsByMinistere(ministere: number): void {
    this.dependanciesLoading.consulats = true;
    this.consulatService
      .getByMinistere(ministere, {}, false)
      .subscribe((consulats) => {
        this.dependancies.consulats = consulats;
        this.dependanciesLoading.consulats = false;
      });
    return;
  }

  getConsulatsByAmbassade(ambassade: number): void {
    this.dependanciesLoading.consulats = true;
    this.consulatService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((consulats) => {
        this.dependancies.consulats = consulats;
        this.dependanciesLoading.consulats = false;
      });
    return;
  }

  getPays(): void {
    this.dependanciesLoading.pays = true;
    this.paysService.getAll(false).subscribe((pays) => {
      this.dependancies.pays = pays;
      this.dependanciesLoading.pays = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        pays_siege: this.formValue("pays_siege")[0].id,
        pays_origine: this.formValue("pays_origine"),
        date_creation: this.formValue("date_creation"),
        ambassade: this.formValue("ambassade")?.length
          ? this.formValue("ambassade")[0].id
          : null,
        consulat: this.formValue("consulat")?.length
          ? this.formValue("consulat")[0].id
          : null,
      };

      this.liaisonService
        .add(this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.helper.toggleModal(`liaison-create-modal`);
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
          this.initialiseForm();
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
