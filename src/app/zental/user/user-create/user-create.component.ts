import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { VilleService } from "../../villes/ville.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent extends BaseCreateComponent implements OnInit {
  @Input() type: any; // Allows us to know what fields to add in our form
  villes: any[] = [];
  villeLoading = false;
  constructor(
    public userService: UserService,
    public villeService: VilleService
  ) {
    super(userService);
  }

  villeDropdownSettings = {
    ...this.dropdownSettings.single,
    idField: "id_ville",
  };

  ngOnInit(): void {
    this.initForm();

    console.log(this.villeDropdownSettings);
  }

  getVilles(): void {
    if (!this.villes.length) {
      this.villeLoading = true;
      this.villeService.getAll(false).subscribe((villes) => {
        this.villes = villes;
        this.villeLoading = false;
      });
    }
  }

  initForm() {
    if (this.type === "enfant") {
      this.form = this.fb.group({
        nom: [null, Validators.required],
        prenom: [null, Validators.required],
        sexe: ["homme", Validators.required],
        date_naissance: [null, Validators.required],
        lieu_naissance: [null, Validators.required],
      });
    } else if (this.type === "parent") {
      this.form = this.fb.group({
        email: [null, [Validators.email]],
        nom: [null, Validators.required],
        prenom: [null, Validators.required],
        telephone: [null, [Validators.required]],
        addresse: [null, [Validators.required]],
        ville: [null, [Validators.required]],
        profession: [null, [Validators.required]],
      });
    } else if (this.type === "contact") {
      this.form = this.fb.group({
        email: [null, [Validators.email]],
        nom: [null, Validators.required],
        prenom: [null, Validators.required],
        telephone: [null, [Validators.required]],
        addresse: [null, [Validators.required]],
        ville: [null, [Validators.required]],
      });
    }
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        lieu_naissance: this.formValue("lieu_naissance")
          ? this.formValue("lieu_naissance")[0].id_ville
          : null,
        ville: this.formValue("ville")
          ? this.formValue("ville")[0].id_ville
          : null,
      };

      this.userService.add(data).subscribe(() => {
        this.form.reset();
        this.loading = false;
      });
    }
  }
}
