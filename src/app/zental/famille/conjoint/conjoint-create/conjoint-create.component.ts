import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ConjointService } from "src/app/zental/conjoint/conjoint.service";
import { IdentiteService } from "src/app/zental/identite/identite.service";
import { SituationMatrimonialService } from "src/app/zental/situtation-matrimonial/situation-matrimonial.service";
import { UserService } from "src/app/zental/user/user.service";
import { TokenStorage } from "src/app/shared/services/token-storage.service";

@Component({
  selector: "app-conjoint-create",
  templateUrl: "./conjoint-create.component.html",
  styleUrls: ["./conjoint-create.component.scss"],
})
export class ConjointCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  user: any;
  dependancies = {
    users: [],
    situationsMatrimoniales: [],
    booleanResponse: ["OUI", "NON"],
  };

  dependanciesLoading = {
    users: false,
    situationsMatrimoniales: false,
  };
  constructor(
    public conjointService: ConjointService,
    public userService: UserService,
    public identiteService: IdentiteService,
    public tokenStorage: TokenStorage,
    public situationMatrimonialeService: SituationMatrimonialService
  ) {
    super(conjointService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = true;
    super.ngOnInit();

    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription)
          if (this.user?.id_inscription !== user.id_inscription)
            this.user = user;
      }
    );

    this._subscription["schema"] = this.conjointService.schema$.subscribe(
      () => {
        this.initialiseForm();
        this.getSituationsMatrimoniales();
      }
    );
  }

  initialiseForm(): void {
    this.initForm(["conjoint1"], [], () => {
      this.addControls(
        ["vivre_ensemble", "situation_matrimoniale"],
        [null, null],
        [false, true]
      );

      this.formValuePatcher("conjoint1", this.user.id_inscription);

      this.form.controls.situation_matrimoniale.valueChanges.subscribe(
        (value) => {
          if (value === 2) {
            this.getUsers();
            if (!this.formValue("vivre_ensemble"))
              this.formValuePatcher(
                "vivre_ensemble",
                this.dependancies.booleanResponse[0]
              );

            if (!this.formValue("meme_nationalite"))
              this.formValuePatcher(
                "meme_nationalite",
                this.dependancies.booleanResponse[0]
              );

            this.form.controls.conjoint2.setValidators([Validators.required]);
            this.form.controls.conjoint2.updateValueAndValidity();

            this.form.controls.vivre_ensemble.setValidators([
              Validators.required,
            ]);
            this.form.controls.vivre_ensemble.updateValueAndValidity();

            this.form.controls.meme_nationalite.setValidators([
              Validators.required,
            ]);
            this.form.controls.meme_nationalite.updateValueAndValidity();
          } else {
            Object.keys(
              this.helper.omitFieldInObject(this.form.value, [
                "situation_matrimoniale",
                "conjoint1",
              ])
            ).forEach((key) => {
              this.formValuePatcher(key, null);
            });
          }
        }
      );

      this.form.controls.vivre_ensemble.valueChanges.subscribe((value) => {
        this.formValuePatcher("meme_pays", "OUI");
      });
    });
  }

  getUsers(): void {
    if (!this.dependancies.users.length) {
      this.dependanciesLoading.users = true;
      this.userService.getAll().subscribe((response) => {
        this.dependancies.users = response;
        this.dependanciesLoading.users = false;
      });
    }
  }

  getSituationsMatrimoniales(): void {
    if (!this.dependancies.situationsMatrimoniales.length) {
      this.dependanciesLoading.situationsMatrimoniales = true;
      this.situationMatrimonialeService.getAll(false).subscribe((response) => {
        this.dependancies.situationsMatrimoniales = response;
        this.dependanciesLoading.situationsMatrimoniales = false;
        this.formValuePatcher(
          "situation_matrimoniale",
          this.dependancies.situationsMatrimoniales[0].id
        );

        console.log(this.form.value);
      });
    }
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        conjoint1: this.user.id_inscription,
        conjoint2: this.formValue("conjoint2")?.length
          ? this.formValue("conjoint2")[0].id_inscription
          : null,
        meme_nationalite: this.formValue("meme_nationalite") === "OUI",
        meme_pays: this.formValue("meme_pays") === "OUI",
        vivre_ensemble: this.formValue("vivre_ensemble") === "OUI",
        situation_matrimoniale: this.formValue("situation_matrimoniale"),
      };

      this.conjointService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();

        // Modifiere le champ situation matrimoniale du user depuis identite
        this.identiteService.user = {
          ...this.user,
          situation_matrimoniale: data.situation_matrimoniale,
        };

        // si le user depuis identité est le user connecté, modifier le champ situation matrimoniale depuis le localStorage
        this.tokenStorage.setUserField(
          "situation_matrimoniale",
          data.situation_matrimoniale
        );
      });
    }
  }
}
