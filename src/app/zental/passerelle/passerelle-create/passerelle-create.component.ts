import { PasseFrontiereService } from "./../../passe-frontiere/passe-frontiere.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueCreateComponent } from "../../shared-zental/abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { TypePasserelleService } from "../../type-passerelle/type-passerelle.service";
import { PasserelleService } from "../passerelle.service";

@Component({
  selector: "app-passerelle-create",
  templateUrl: "./passerelle-create.component.html",
  styleUrls: ["./passerelle-create.component.scss"],
})
export class PasserelleCreateComponent
  extends EntiteDiplomatiqueCreateComponent
  implements OnInit
{
  dependancies = {
    types: [],
    passeFrontieres: [],
  };
  dependanciesLoading = {
    types: false,
    passeFrontieres: false,
  };
  constructor(
    public passerelleService: PasserelleService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public passeFrontiereService: PasseFrontiereService,
    public typeService: TypePasserelleService
  ) {
    super(
      passerelleService,
      ministereService,
      paysService,
      router,
      route,
      "passerelle"
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.getPasseFrontiere();

    this.getTypes();

    this.addControls(["type", "passe_frontiere"], [null, null], [true, true]);
  }

  getTypes(): void {
    this.dependanciesLoading.types = true;
    this.typeService.getAll(false).subscribe((types) => {
      this.dependancies.types = types;
      this.dependanciesLoading.types = false;
    });
  }

  getPasseFrontiere(): void {
    this.dependanciesLoading.passeFrontieres = true;
    this.passeFrontiereService.getAll(false).subscribe((passeFrontieres) => {
      this.dependancies.passeFrontieres = passeFrontieres;
      this.dependanciesLoading.passeFrontieres = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
        type: this.formValue("type")[0].id,
        passe_frontiere: this.formValue("passe_frontiere")[0].id,
      };

      this.passerelleService.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.formValuePatcher("pays_origine", this.ministere.pays.id);
        this.helper.toggleModal(`passerelle-create-modal`);
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
