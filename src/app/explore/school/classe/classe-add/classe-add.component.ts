import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    public etablissementService: EtablissementService,
    public router: Router,
    public route: ActivatedRoute
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

          this.isFormOk = true;
        }
      );
    });
  }

  getFormations() {
    this.formationLoading = true;
    this.formationService
      .getByEtablissement(this.etablissementService.singleData.id)
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
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.toastSuccess();
      });
    }
  }
}
