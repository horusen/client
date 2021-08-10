import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VilleService } from "../../villes/ville.service";
import { AdresseCreateComponent } from "../adresse-create/adresse-create.component";
import { AdresseService } from "../adresse.service";

@Component({
  selector: "app-adresse-edit",
  templateUrl: "./adresse-edit.component.html",
  styleUrls: ["./adresse-edit.component.scss"],
})
export class AdresseEditComponent
  extends AdresseCreateComponent
  implements OnInit
{
  single: any;
  constructor(
    public adresseService: AdresseService,
    public villeService: VilleService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(adresseService, villeService, router, route);
  }

  ngOnInit(): void {
    this._subscription["adresse"] = this.adresseService.singleData$.subscribe(
      (adresse) => {
        this.single = adresse;

        this.initialiseForm(this.single);

        this.getVilles(() => {
          this.formValuePatcher("ville", [this.single.ville]);
        });
      }
    );
  }

  initialiseForm(adresse: any) {
    this.form = this.fb.group({
      ville: ["", Validators.required],
      adresse: [adresse.adresse],
      entite_diplomatique: this.parent.item.entite_diplomatique.id,
    });

    this.isFormOk = true;
  }

  edit() {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        ville: this.formValue("ville")[0].id_ville,
      });

      this.adresseService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("adresse-edit-modal");
        this.helper.alertSuccess();
        this.initialiseForm(this.single);
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
