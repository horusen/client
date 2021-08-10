import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueCreateComponent } from "../../shared-zental/abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { VilleService } from "../../villes/ville.service";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-create",
  templateUrl: "./consulat-create.component.html",
  styleUrls: ["./consulat-create.component.scss"],
})
export class ConsulatCreateComponent
  extends EntiteDiplomatiqueCreateComponent
  implements OnInit
{
  villes = [];
  villeLoading = false;

  villeDropDownSettings = {
    ...this.dropdownSettings.single,
    idField: "id_ville",
  };
  constructor(
    public consulatService: ConsulatService,
    public ministereService: MinistereService,
    public villeService: VilleService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      consulatService,
      ministereService,
      paysService,
      router,
      route,
      "consulat"
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["ministere2"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.addControl("ministere", ministere.id);
      });

    this.addControl("ville", null, true);

    this.form.controls.pays_siege.valueChanges.subscribe((pays) => {
      if (pays) this.getVilles(pays[0].id);
    });
  }

  getVilles(pays: number): void {
    console.log("hitted");
    this.villeLoading = true;
    this.villeService.getByPays(pays, false).subscribe((villes) => {
      this.villes = villes;
      this.villeLoading = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
        ville: this.formValue("ville")[0].id_ville,
      };

      this.service.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.formValuePatcher(
          "pays_origine",
          this.ministere.entite_diplomatique.pays_siege.id
        );
        this.formValuePatcher("ministere", this.ministere.id);
        this.helper.toggleModal(`${this.element}-create-modal`);
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
