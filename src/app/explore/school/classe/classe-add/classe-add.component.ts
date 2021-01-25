import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { FormationService } from "../../formation/formation.service";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-add",
  templateUrl: "./classe-add.component.html",
  styleUrls: ["./classe-add.component.scss"],
})
export class ClasseAddComponent extends BaseCreateComponent implements OnInit {
  formations: any[] = [];
  formationLoading: boolean = false;
  constructor(
    public classeService: ClasseService,
    public formationService: FormationService,
    public etablissementService: EtablissementService
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.getFormations();

    this._subscription["schema"] = this.classeService.schema$.subscribe(() => {
      this.initForm(
        ["libelle", "capacite", "code", "formation"],
        ["debut", "fin"],
        () => {
          this.addBlurField(["debut", "fin"]);
          this.formValueComparer(
            "debut",
            "fin",
            "laDateDeDebutEstSuperieurALaDateDeFin"
          );
        }
      );
    });
  }

  getFormations() {
    this.formationLoading = true;
    this.formationService
      .getByEtablissements(this.etablissementService.etablissement.id)
      .subscribe((data) => {
        this.formations = data;
        this.formationLoading = false;
      });
  }

  create() {
    if (this.form.value) {
      this.loading = true;
      const data = {
        formation: this.formValue("formation")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, ["formation"]),
      };
      this.classeService.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.helper.toggleModal("classe-add-modal");
      });
    }
  }
}
