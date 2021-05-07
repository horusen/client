import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { DomaineService } from "../../domaine/domaine.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { UserService } from "../../user/user.service";
import { ProfesseurAddComponent } from "../professeur-add/professeur-add.component";
import { ProfesseurService } from "../professeur.service";

@Component({
  selector: "app-professeur-edit",
  templateUrl: "./professeur-edit.component.html",
  styleUrls: ["./professeur-edit.component.scss"],
})
export class ProfesseurEditComponent
  extends ProfesseurAddComponent
  implements OnInit {
  single: any;
  public dropdownSettingsAlt = {
    single: {
      singleSelection: true,
      labelKey: "libelle",
      enableSearchFilter: true,
      disabled: false,
    },
    multi: {
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      labelKey: "libelle",
      enableSearchFilter: true,
    },
    user: {
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: true,
      allowSearchFilter: true,
      disabled: true,
    },
    users: {
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    },
  };
  constructor(
    public professeurService: ProfesseurService,
    public domaineService: DomaineService,
    public userService: UserService,
    public etablissementService: EtablissementService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(professeurService, domaineService, userService, etablissementService);
  }

  ngOnInit(): void {
    this.isFormOk = false;
    this.getDomaines();

    this._subscription[
      "professeur"
    ] = this.professeurService.singleData$.subscribe((professeur) => {
      if (professeur) {
        this.single = professeur;
        this.initialiseForm(professeur);
      }
    });
  }

  initialiseForm(data?: any) {
    this.form = this.fb.group({
      professeur: [[data?.professeur_details], Validators.required],
      etablissement: [data?.etablissement, Validators.required],
      domaines: [data?.domaines, Validators.required],
    });

    this.isFormOk = true;
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      let data = {
        etablissement: this.formValue("etablissement"),
        professeur: this.formValue("professeur")[0].id_inscription,
        domaines: this.helper.idExtractor(this.formValue("domaines")),
      };

      this.professeurService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.toggleModal("professeur-edit-modal");
      });
    }
  }
}
