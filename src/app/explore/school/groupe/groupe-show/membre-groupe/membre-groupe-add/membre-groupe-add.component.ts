import { GroupeService } from "src/app/explore/school/groupe/groupe.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AbstractBaseService } from "src/app/shared/services/abstract-base.service";
import { MembreGroupeService } from "../membre-groupe.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-membre-groupe-add",
  templateUrl: "./membre-groupe-add.component.html",
  styleUrls: ["./membre-groupe-add.component.scss"],
})
export class MembreGroupeAddComponent
  extends BaseCreateComponent
  implements OnInit {
  nonMembres: any[] = [];
  getNonMembreLoading: boolean = false;
  @Output() fermerAddComponent = new EventEmitter();
  constructor(
    public baseService: AbstractBaseService,
    public groupeService: GroupeService,
    public membreGroupeService: MembreGroupeService,
    public router: Router
  ) {
    super(baseService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();
    this.subscribeToDependancies();
  }

  subscribeToDependancies() {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.formValuePatcher("groupe", groupe.id);

        if (
          this.router.url.includes("school/tache") ||
          this.router.url.includes("school/administration")
        ) {
          this.getNonMembreDansClasse(groupe.id);
        } else if (this.router.url.includes("school/professeur")) {
          this.getNonMembreProfesseur(groupe.id);
        } else if (this.router.url.includes("school/groupe-independant")) {
          this.getNonMembreGroupeIndependant(groupe.id);
        }
      }
    );
  }

  getNonMembreDansClasse(groupe: number) {
    this.getNonMembreLoading = true;
    this.membreGroupeService
      .getNonMembreDansClasse(groupe)
      .subscribe((data) => {
        this.nonMembres = data;
        this.getNonMembreLoading = false;
      });
  }

  getNonMembreGroupeIndependant(groupe: number) {
    this.getNonMembreLoading = true;
    this.membreGroupeService
      .getNonMembreGroupeIndependant(groupe)
      .subscribe((data) => {
        this.nonMembres = data;
        this.getNonMembreLoading = false;
      });
  }

  getNonMembreProfesseur(groupe: number) {
    this.getNonMembreLoading = true;
    this.membreGroupeService
      .getNonMembreProfesseur(groupe)
      .subscribe((data) => {
        this.nonMembres = data;
        this.getNonMembreLoading = false;
      });
  }

  initialiseForm() {
    this.form = this.fb.group({
      membres: [[], Validators.required],
      groupe: [null, Validators.required],
    });
  }

  closeAddComponent() {
    this.fermerAddComponent.emit();
  }

  ajouterMembre() {
    this.loading = true;
    const data = {
      membres: this.helper.idExtractor(
        this.formValue("membres"),
        "id_inscription"
      ),
      ...this.helper.omitFieldInObject(this.form.value, ["membres"]),
    };
    this.membreGroupeService.add(data).subscribe(() => {
      this.loading = false;
      this.initialiseForm();
      this.closeAddComponent();
    });
  }
}
