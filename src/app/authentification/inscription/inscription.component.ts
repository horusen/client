import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AbstractBaseService } from "src/app/shared/services/abstract-base.service";
import { PaysService } from "src/app/zental/pays/pays.service";
import { VilleService } from "src/app/zental/villes/ville.service";

@Component({
  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.scss"],
})
export class InscriptionComponent
  extends BaseCreateComponent
  implements OnInit
{
  imageUrl: any;
  form: FormGroup;
  loading: boolean = false;
  tabs = {
    part1: true,
    part2: false,
    part3: false,
  };

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
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public service: AbstractBaseService,
    public ngxPicaService: NgxPicaService,
    public paysService: PaysService,
    public villeService: VilleService
  ) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();

    this.getDependancies();
  }

  showTab(tab: string): void {
    this.resetTabs();
    this.tabs[tab] = true;
  }

  resetTabs(): void {
    Object.keys(this.tabs).forEach((key) => (this.tabs[key] = false));
  }

  initForm() {
    this.form = this.fb.group({
      part1: this.fb.group({
        prenom: [null, Validators.required],
        nom: [null, Validators.required],
        date_naissance: [null, [Validators.required]],
        lieu_naissance: ["", Validators.required],
        sexe: ["homme", Validators.required],
        profession: ["", Validators.required],
      }),
      part2: this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        telephone: ["", Validators.required],
        password: [null, Validators.required],
        password_confirmation: [null, [Validators.required]],
        addresse: ["", Validators.required],
        ville: ["", Validators.required],
        nationalites: ["", Validators.required],
      }),
      part3: this.fb.group({
        condition_utilisation: [false, Validators.requiredTrue],
      }),
    });

    this.formData = new FormData();

    this.form.get("part1.sexe").valueChanges.subscribe((sexe) => {
      console.log(sexe);
      if (sexe !== "homme" && sexe !== "femme") {
        this.formValuePatcher("part1.sexe", "homme");
        this.helper.alertDanger("alert");
      }
    });

    this.form
      .get("part2.password_confirmation")
      .valueChanges.subscribe((text) => {
        if (text !== this.formValue("part2.password")) {
          this.form
            .get("part2.password_confirmation")
            .setErrors({ notMatchWithPassword: true });
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

    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    this.formData.append("photo", image);
    this.ngxPicaService
      .resizeImage(image, 35, 35)
      .subscribe((imageRetailler) => {
        this.formData.append(
          "photo_min",
          new File([imageRetailler], imageRetailler.name, {
            type: imageRetailler.type,
          })
        );
      });
  }

  fillFormDataWithObject(object: any): void {
    Object.keys(object).forEach((key) => {
      this.formData.append(key, object[key]);
    });
  }

  inscription() {
    // console.log(this.form.value);

    if (this.form.valid) {
      this.loading = true;
      const data = {
        ville: this.formValue("part2.ville")[0].id_ville,
        lieu_naissance: this.formValue("part1.lieu_naissance")[0].id_ville,
        nationalites: this.helper.idExtractor(
          this.formValue("part2.nationalites")
        ),
        ...this.helper.omitFieldInObject(this.formValue("part1"), [
          "lieu_naissance",
        ]),
        ...this.helper.omitFieldInObject(this.formValue("part2"), [
          "ville",
          "nationalites",
        ]),
        ...this.helper.omitFieldInObject(this.formValue("part3"), []),
      };
      this.fillFormDataWithObject(data);

      this.authService.incsription(this.formData).subscribe(() => {
        this.loading = false;
        this.initForm();
        this.formData = new FormData();
        this.router.navigate(["school", "explore"]);
      });
    } else {
      this.helper.toastDanger();
    }
  }
}
