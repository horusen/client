import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueEditComponent } from "../../shared-zental/abstract/entite-diplomatique-edit/entite-diplomatique-edit.component";
import { VilleService } from "../../villes/ville.service";
import { ConsulatCreateComponent } from "../consulat-create/consulat-create.component";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-edit",
  templateUrl: "./consulat-edit.component.html",
  styleUrls: ["./consulat-edit.component.scss"],
})
export class ConsulatEditComponent extends ConsulatCreateComponent {
  consulat: any;
  constructor(
    public consulatService: ConsulatService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public villeService: VilleService
  ) {
    super(
      consulatService,
      ministereService,
      villeService,
      paysService,
      router,
      route
    );
  }
  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["consulat"] = this.consulatService.singleData$.subscribe(
      (consulat) => {
        this.consulat = consulat;
        this.initialiseForm(consulat);
        this.addControl("ville", [consulat.ville]);
        this.getVilles(consulat.entite_diplomatique.pays_siege.id);
        this.form.controls.pays_siege.valueChanges.subscribe((pays) => {
          if (pays) this.getVilles(pays[0].id);
        });

        this._subscription["ministere2"] =
          this.ministereService.singleData$.subscribe((ministere) => {
            this.addControl("ministere", ministere.id);
          });
      }
    );
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
        ville: this.formValue("ville")[0].id,
      };

      this.service.update(this.consulat.id, data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.formValuePatcher("pays_origine", this.ministere.pays.id);
        this.formValuePatcher("ministere", this.ministere.id);
        this.helper.toggleModal(`${this.element}-edit-modal`);
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
