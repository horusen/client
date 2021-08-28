import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaysService } from "../../pays/pays.service";
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
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public villeService: VilleService
  ) {
    super(consulatService, villeService, paysService, router, route);
  }
  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["consulat"] = this.consulatService.singleData$.subscribe(
      (consulat) => {
        this.consulat = consulat;
        this.initialiseForm(consulat);
        console.log(this.form.value);
        this.getVilles(consulat.entite_diplomatique.pays_siege.id);
      }
    );
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_origine: this.formValue("pays_origine").id,
        pays_siege: this.formValue("pays_siege")[0].id,
        ville: this.formValue("ville")[0].id_ville,
      };

      this.service.update(this.consulat.id, data).subscribe(() => {
        this.loading = false;
        this.initialiseForm(this.consulat);
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
