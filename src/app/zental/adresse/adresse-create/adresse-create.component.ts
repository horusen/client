import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { VilleService } from "../../villes/ville.service";
import { AdresseService } from "../adresse.service";

@Component({
  selector: "app-adresse-create",
  templateUrl: "./adresse-create.component.html",
  styleUrls: ["./adresse-create.component.scss"],
})
export class AdresseCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  // May represent Ministere, Ambassade or every entity which have physical adress
  @Input() parent: { name: string; item: any };

  villes: any[] = [];
  villesLoading = false;

  villeDropdownSettings = Object.assign(this.dropdownSettingsAlt.single, {});

  constructor(
    public adresseService: AdresseService,
    public villeService: VilleService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(adresseService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = true;
    super.ngOnInit();

    this._subscription["schema"] = this.adresseService.schema$.subscribe(() => {
      this.initialiseForm();
    });

    this.getVilles();
  }

  initialiseForm(adresse?: any) {
    this.initForm(["ville", "adresse"], [], () => {
      // Ajout
      this.addControl(
        "entite_diplomatique",
        this.parent.item.entite_diplomatique.id,
        true
      );
    });
  }

  getVilles(callback?: Function) {
    this.villesLoading = true;
    this.villeService
      .getByPays(this.parent.item.entite_diplomatique.pays_siege.id)
      .subscribe((villes) => {
        this.villes = villes;
        this.villesLoading = false;

        if (callback) {
          callback();
        }
      });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        ville: this.formValue("ville")[0].id_ville,
      });

      this.adresseService.add(data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("adresse-create-modal");
        this.helper.alertSuccess();
        this.initialiseForm();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
