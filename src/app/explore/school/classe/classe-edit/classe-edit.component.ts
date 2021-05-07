import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { FormationService } from "../../formation/formation.service";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-edit",
  templateUrl: "./classe-edit.component.html",
  styleUrls: ["./classe-edit.component.scss"],
})
export class ClasseEditComponent extends BaseEditComponent implements OnInit {
  formations: any[] = [];
  formationLoading: boolean = false;
  constructor(
    public classeService: ClasseService,
    public formationService: FormationService,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    this.getFormations();
    this._subscription["single"] = this.classeService.singleData$.subscribe(
      (single) => {
        this.single = single;
        this.initFormWithData(
          single,
          ["libelle", "capacite", "code", "formation"],
          ["debut", "fin", "id", "created_at", "updated_at", "deleted_at"],
          () => {
            this.formValuePatcher("formation", [single.formation]);

            this.addBlurField(["debut", "fin"]);
            this.formValuePatcher("debut", single.debut);
            this.formValuePatcher("fin", single.fin);
            this.formValueComparer(
              "debut",
              "fin",
              "laDateDeDebutEstSuperieurALaDateDeFin"
            );
          }
        );
      }
    );
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

  update() {
    if (this.form.value) {
      this.loading = true;
      const data = {
        formation: this.formValue("formation")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, ["formation"]),
      };
      this.classeService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.toastSuccess();
      });
    }
  }
}
