import { ParentDefinition } from "./../../../shared/models/parent-definition.model";
import { PasseFrontiereService } from "./../../passe-frontiere/passe-frontiere.service";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaysService } from "../../pays/pays.service";
import { TypePasserelleService } from "../../type-passerelle/type-passerelle.service";
import { PasserelleService } from "../passerelle.service";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";

@Component({
  selector: "app-passerelle-create",
  templateUrl: "./passerelle-create.component.html",
  styleUrls: ["./passerelle-create.component.scss"],
})
export class PasserelleCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  dependancies = {
    types: [],
    pays: [],
    passeFrontieres: [],
  };
  dependanciesLoading = {
    types: false,
    pays: false,
    passeFrontieres: false,
  };

  constructor(
    public passerelleService: PasserelleService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public passeFrontiereService: PasseFrontiereService,
    public typeService: TypePasserelleService
  ) {
    super(passerelleService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDependancies();
  }

  getDependancies(): void {
    this.getPays();

    this.getPasseFrontiere();

    this.getTypes();
  }

  initialiseForm(passerelle?: any) {
    this.form = this.fb.group({
      pays_origine: [
        passerelle
          ? [passerelle.pays_origine]
          : this.parent.item.entite_diplomatique.pays_origine.id,
      ],
      pays_siege: [passerelle ? [passerelle.pays_siege] : []],
      type: [passerelle ? [passerelle.type] : []],
      passe_frontiere: [passerelle ? [passerelle.passe_frontiere] : []],
    });
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
        pays_origine: this.formValue("pays_origine"),
        pays_siege: this.formValue("pays_siege")[0].id,
        type: this.formValue("type")[0].id,
        passe_frontiere: this.formValue("passe_frontiere")[0].id,
      };

      this.passerelleService.add(data).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal(`passerelle-create-modal`);
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
