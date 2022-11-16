import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PaysService } from "../../pays/pays.service";
import { VilleService } from "../../villes/ville.service";
import { IdentiteService } from "../identite.service";

@Component({
  selector: "app-identite-edit",
  templateUrl: "./identite-edit.component.html",
  styleUrls: ["./identite-edit.component.scss"],
})
export class IdentiteEditComponent
  extends BaseCreateComponent
  implements OnInit
{
  imageUrl: any;
  dependancies = {
    villes: [],
    pays: [],
  };

  dependanciesLoading = {
    villes: false,
    pays: false,
  };

  villeDropdownSettings = {
    ...this.dropdownSettingsAlt.single,
    idField: "id_ville",
  };

  constructor(
    public ngxPicaService: NgxPicaService,
    public paysService: PaysService,
    public villeService: VilleService,
    public identiteService: IdentiteService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDependancies();
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      prenom: [this.auth.user.prenom, Validators.required],
      image: [this.auth.user.photo?.path, Validators.required],
      nom: [this.auth.user.nom, Validators.required],
      email: [this.auth.user.email, Validators.required],
      date_naissance: [this.auth.user.date_naissance, Validators.required],
      lieu_naissance: [[this.auth.user.lieu_naissance], Validators.required],
      telephone: [this.auth.user.telephone, Validators.required],
      sexe: [this.auth.user.sexe, Validators.required],
      profession: [this.auth.user.profession, Validators.required],
      nationalites: [
        this.auth.user.nationalites.map((nationalite) => nationalite.pays),
        Validators.required,
      ],
    });

    this.form.get("sexe").valueChanges.subscribe((sexe) => {
      console.log(sexe);
      if (sexe !== "homme" && sexe !== "femme") {
        this.formValuePatcher("sexe", "homme");
        this.helper.alertDanger("alert");
      }
    });
  }

  getVilles(): void {
    this.dependanciesLoading.villes = true;
    this.villeService.getAll(false).subscribe((villes) => {
      this.dependancies.villes = villes;
      this.dependanciesLoading.villes = false;
    });
  }

  getPays(): void {
    this.dependanciesLoading.pays = true;
    this.paysService.getAll(false).subscribe((pays) => {
      this.dependancies.pays = pays;
      this.dependanciesLoading.pays = false;
    });
  }

  getDependancies(): void {
    this.getPays();
    this.getVilles();
  }

  onFileChanged(event) {
    let image = event.target.files[0];

    this.formData.append("photo", image);
    this.ngxPicaService
      .resizeImage(image, 150, 150)
      .subscribe((imageRetailler) => {
        this.formData.append(
          "photo_min",
          new File([imageRetailler], imageRetailler.name, {
            type: imageRetailler.type,
          })
        );

        let reader = new FileReader();
        reader.readAsDataURL(imageRetailler);
        reader.onload = () => {
          this.imageUrl = reader.result;
        };
      });
  }

  fillFormDataWithObject(object: any): void {
    Object.keys(object).forEach((key) => {
      this.formData.append(key, object[key]);
    });
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        lieu_naissance: this.formValue("lieu_naissance")[0].id_ville,
        nationalites: this.helper.idExtractor(this.formValue("nationalites")),
        ...this.helper.omitFieldInObject(this.form.value, [
          "lieu_naissance",
          "nationalites",
          "image",
        ]),
      };

      this.fillFormDataWithObject(data);

      this.auth.editUser(this.formData).subscribe(() => {
        this.loading = false;
        this.formData = new FormData();
        this.helper.alertSuccess();
        // Re-emit the edited user
        this.identiteService.user = this.auth.user;

        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("identite-edit-modal");
      });
    } else {
      this.helper.toastDanger();
    }
  }
}
