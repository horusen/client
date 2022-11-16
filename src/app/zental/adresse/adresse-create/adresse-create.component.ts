import { Validators } from "@angular/forms";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
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
    public addresseService: AdresseService,
    public villeService: VilleService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(addresseService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = true;
    super.ngOnInit();

    this.initialiseForm();

    this.getVilles();
  }

  initialiseForm(addresse?: any) {
    this.form = this.fb.group({
      addresse: [addresse?.addresse, Validators.required],
      ville: [addresse ? [addresse.ville] : null, Validators.required],
      [this.parent.name === "user" ? "user" : "entite_diplomatique"]: [
        this.parent.item.entite_diplomatique?.id ||
          this.parent.item.id_inscription,
        Validators.required,
      ],
    });

    this.isFormOk = true;
  }

  getVilleByPays(pays: number): void {
    this.villesLoading = true;
    this.villeService.getByPays(pays, false).subscribe({
      next: (villes) => {
        this.villes = villes;
        this.villesLoading = false;
      },
    });
  }

  getAllVilles(): void {
    this.villesLoading = true;
    this.villeService.getAll().subscribe({
      next: (villes) => {
        this.villes = villes;
        this.villesLoading = false;
      },
    });
  }

  getVilles() {
    if (this.parent.name === "user") {
      this.getAllVilles();
    } else {
      this.getVilleByPays(this.parent.item.entite_diplomatique.pays_siege.id);
    }
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        ville: this.formValue("ville")[0].id_ville,
      });

      this.addresseService.add(data).subscribe(() => {
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
