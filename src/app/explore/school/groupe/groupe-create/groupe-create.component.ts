import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ClasseService } from "../../classe/classe.service";
import { ConfidentialiteService } from "../../confidentialite/confidentialite.service";
import { DomaineService } from "../../domaine/domaine.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-create",
  templateUrl: "./groupe-create.component.html",
  styleUrls: ["./groupe-create.component.scss"],
})
export class GroupeCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  groupeIndependant: boolean = false;
  dependancies = {
    domaines: [],
    classes: [],
    confidentialites: [],
  };

  dependanciesLoading = {
    domaine: false,
    classe: false,
    confidentialite: false,
  };
  constructor(
    public groupeService: GroupeService,
    public domaineService: DomaineService,
    public classeService: ClasseService,
    public confidentialiteService: ConfidentialiteService,
    public router: Router
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.groupeIndependant = this.router.url.includes("groupe-independant");

    this._subscription["schema"] = this.groupeService.schema$.subscribe(() => {
      this.initialiseForm();
    });

    this.getDependancies();

    this.subscribeToDependancies();
  }

  initialiseForm() {
    this.isFormOk = false;
    this.initForm(
      ["libelle", "confidentialite", "type", "description", "etat"],
      [],
      () => {
        this.valuesPatcher(
          ["confidentialite", "type", "etat"],
          [
            this.dependancies.confidentialites[0],
            this.groupeIndependant ? 2 : 1,
            1,
          ]
        );

        this.groupeIndependant ? null : this.addControl("classe", [], true);
        this.addControl("domaines", [], true);
      }
    );
  }

  subscribeToDependancies() {
    // domaine
    this._subscription["domaine"] = this.domaineService.data$.subscribe(
      (data) => (this.dependancies.domaines = data)
    );

    // classe
    this._subscription["classe"] = this.classeService.data$.subscribe(
      (data) => (this.dependancies.classes = data)
    );

    // confidentialite
    this._subscription[
      "confidentialie"
    ] = this.confidentialiteService.data$.subscribe(
      (data) => (this.dependancies.confidentialites = data)
    );
  }

  getDependancies() {
    // domaine
    this.dependanciesLoading.domaine = true;
    this.domaineService.get().subscribe(() => {
      this.dependanciesLoading.domaine = false;
    });

    if (!this.groupeIndependant) {
      // Classe
      this.dependanciesLoading.classe = true;
      this.classeService.get().subscribe(() => {
        this.dependanciesLoading.classe = false;
      });
    }

    // Confidentialite
    this.dependanciesLoading.confidentialite = true;
    this.confidentialiteService.get().subscribe(() => {
      this.dependanciesLoading.confidentialite = false;
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        domaines: this.helper.idExtractor(this.formValue("domaines")),
        confidentialite: this.formValue("confidentialite")[0].id,
        classe: this.groupeIndependant ? null : this.formValue("classe")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, [
          "domaines",
          "classe",
          "confidentialite",
        ]),
      };

      this.groupeService
        .add(this.helper.omitNullValueInObject(data))
        .subscribe(() => {
          this.loading = false;

          // Form reset
          this.form.reset();
          this.valuesPatcher(
            ["confidentialite", "type", "etat"],
            [this.dependancies.confidentialites[0], 1, 1]
          );

          this.helper.toggleModal("groupe-create-modal");
          this.helper.alertSuccess();
        });
    }
  }
}
