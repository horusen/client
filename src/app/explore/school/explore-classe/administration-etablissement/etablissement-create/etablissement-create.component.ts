import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit } from "@angular/core";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";
import { TypeEtablissementService } from "../../../etablissement/type-etablissement/type-etablissement.service";
import { PaysService } from "../../../pays/pays.service";

@Component({
  selector: "app-etablissement-create",
  templateUrl: "./etablissement-create.component.html",
  styleUrls: ["./etablissement-create.component.scss"],
})
export class EtablissementCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  imageUrl: any;
  dependancies = {
    pays: [],
    type: [],
    etablissement: [],
  };

  dependancieLoading = {
    pays: false,
    type: false,
    etablissement: false,
  };

  constructor(
    public etablissementService: EtablissementService,
    public paysService: PaysService,
    public translateService: TranslateService,
    public typeEtablissementService: TypeEtablissementService,
    public ngxPicaService: NgxPicaService
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = true;
    super.ngOnInit();

    this._subscription["schema"] = this.etablissementService.schema$.subscribe(
      () => {
        this.initForm(
          ["type", "libelle", "cigle", "ninea", "date_creation_physique"],
          ["etat", "description_symbole"],
          () => {
            this.addControl("etablissements_affilies", []);
            this.addBlurField(["description_symbole"]);

            this.form.controls.description_symbole.valueChanges.subscribe(
              (value) => {
                if (value && !this.formValue("symbole_embleme")) {
                  this.formValuePatcher("description_symbole", null);

                  // Traduction message d'erreur
                  this.translateService
                    .get("ajouterDAbordUnSymbole")
                    .subscribe((translatedWord) => {
                      // Affichage message d'erreur
                      this.helper.toastDanger(translatedWord);
                    });
                }
              }
            );
          }
        );
      }
    );

    this.getDependancies();
  }

  onFileChanged(files: File[], name: string) {
    let image = files[0];

    if (name == "logo") {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };

      this.ngxPicaService
        .resizeImage(image, 55, 55)
        .subscribe((imageRetailler) => {
          this.formData.append(
            "logo_min",
            new File([imageRetailler], imageRetailler.name, {
              type: imageRetailler.type,
            })
          );
        });
    }

    this.formData.append(name, image);
  }

  getDependancies() {
    this.getEtablissement();
    // this.getPays();
    this.getType();
  }

  getPays(): void {
    this.dependancieLoading.pays = true;
    this.paysService.initialise(false).subscribe((pays) => {
      this.dependancies.pays = pays;
      this.dependancieLoading.pays = false;
    });
  }

  getEtablissement(): void {
    this.dependancieLoading.etablissement = true;
    this.etablissementService.get(false).subscribe((etablissements) => {
      this.dependancies.etablissement = etablissements;
      this.dependancieLoading.etablissement = false;
    });
  }

  getType(): void {
    this.dependancieLoading.type = true;
    this.typeEtablissementService.get(false).subscribe((types) => {
      this.dependancies.type = types;
      this.dependancieLoading.type = false;
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        type: this.formValue("type")[0]?.id,
        etablissement_mere: this.formValue("etablissement_mere")[0]?.id || null,
        etablissements_affilies: this.formValue("etablissements_affilies")
          .length
          ? [this.helper.idExtractor(this.formValue("etablissements_affilies"))]
          : null,
        // pays: this.formValue("pays")[0]?.id || null,
        ...this.helper.omitFieldInObject(this.form.value, [
          "type",
          "etablissements_affilies",
          "etablissement_mere",
          "pays",
        ]),
      };

      this.fillFormData(this.helper.omitNullValueInObject(data));

      this.etablissementService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
        this.helper.toggleModal("etablissement-create-modal");
        this.formData = new FormData();
        this.form.reset();
      });
    } else {
      this.helper.toastDanger(
        "Erreur dans le formulaire",
        "Remplissez convenablement les champs"
      );
    }
  }
}
