import { ConfidentialiteService } from "./../../confidentialite/confidentialite.service";
import { GroupeService } from "src/app/explore/school/groupe/groupe.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { DomaineService } from "../../domaine/domaine.service";

@Component({
  selector: "app-groupe-edit",
  templateUrl: "./groupe-edit.component.html",
  styleUrls: ["./groupe-edit.component.scss"],
})
export class GroupeEditComponent extends BaseEditComponent implements OnInit {
  @Output() done = new EventEmitter();
  dependancies = {
    domaines: [],
    confidentialites: [],
  };

  dependanciesLoading = {
    domaine: false,
    confidentialite: false,
  };
  constructor(
    public groupeService: GroupeService,
    public domaineService: DomaineService,
    public confidentialiteService: ConfidentialiteService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["single"] = this.groupeService.singleData$.subscribe(
      () => {
        this.initialiseForm();
      }
    );

    this.getDependancies();

    this.subscribeToDependancies();
  }

  initialiseForm() {
    this.initFormWithData(
      this.single,
      [
        "libelle",
        "confidentialite",
        "type",
        "description",
        "etat",
        "domaines",
        "classe",
      ],
      [],
      () => {
        this.valuesPatcher(
          ["confidentialite", "classe"],
          [[this.single.confidentialite], [this.single.classe]]
        );
      }
    );
  }

  subscribeToDependancies() {
    // domaine
    this._subscription["domaine"] = this.domaineService.data$.subscribe(
      (data) => (this.dependancies.domaines = data)
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

    // Confidentialite
    this.dependanciesLoading.confidentialite = true;
    this.confidentialiteService.get().subscribe(() => {
      this.dependanciesLoading.confidentialite = false;
    });
  }

  edit() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        domaines: this.helper.idExtractor(this.formValue("domaines")),
        confidentialite: this.formValue("confidentialite")[0].id,
        classe: this.formValue("classe")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, [
          "domaines",
          "classe",
          "confidentialite",
        ]),
      };

      this.groupeService.update(this.single.id, data).subscribe(() => {
        this.loading = false;

        this.done.emit();
        this.helper.alertSuccess();
      });
    }
  }
}
