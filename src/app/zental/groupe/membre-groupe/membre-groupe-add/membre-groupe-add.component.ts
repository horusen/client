import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { RelatedToUserService } from "src/app/zental/shared-zental/service/related-to-user.service";
import { GroupeService } from "../../groupe/groupe.service";
import { MembreGroupeService } from "../membre-groupe.service";

@Component({
  selector: "app-membre-groupe-add",
  templateUrl: "./membre-groupe-add.component.html",
  styleUrls: ["./membre-groupe-add.component.scss"],
})
export class MembreGroupeAddComponent
  extends BaseCreateComponent
  implements OnInit
{
  groupe: any;
  dependancies = {
    nonMembres: [],
  };

  dependanciesLoading = {
    nonMembres: false,
  };

  constructor(
    public membreGroupeService: MembreGroupeService,
    public userService: RelatedToUserService,
    public groupeService: GroupeService
  ) {
    super(membreGroupeService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.groupe = groupe;
        this.getNonMembres(groupe.id);
        this.initialiseForm();
      }
    );
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      membres: [null, Validators.required],
      groupe: [this.groupe, Validators.required],
    });
  }

  getNonMembres(groupe: number): void {
    this.dependanciesLoading.nonMembres = true;
    this.userService.getNonMembreGroupe(groupe).subscribe((nonMembres) => {
      this.dependancies.nonMembres = nonMembres;
      this.dependanciesLoading.nonMembres = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        membres: this.helper.idExtractor(
          this.formValue("membres"),
          "id_inscription"
        ),
        groupe: this.formValue("groupe").id,
      };

      this.membreGroupeService.add(data).subscribe(() => {
        this.loading = false;
        this.groupeService.setFieldInSingleData(
          "nombre_membres",
          this.groupe.nombre_membres + data.membres.length
        );
        this.created.emit(true);
        this.helper.alertSuccess();
        this.formValuePatcher("membres", null);
      });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
