import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    public villeService: VilleService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(consulatService, paysService, router, route, "consulat");
  }

  ngOnInit(): void {
    super.ngOnInit();
    console.log(this.form.value);
  }

  initialiseForm(item?: any): void {
    super.initialiseForm(item);
    this.addControl(
      "ville",
      item?.addresse ? [item?.addresse?.ville] : null,
      true
    );
    this.addControl(
      "addresse",
      item?.addresse ? item?.addresse?.addresse : null,
      true
    );

    this.form.controls.pays_siege.valueChanges.subscribe((pays) => {
      if (pays) this.getVilles(pays[0].id);
    });
  }

  getVilles(pays: number): void {
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
        this.initialiseForm();
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
