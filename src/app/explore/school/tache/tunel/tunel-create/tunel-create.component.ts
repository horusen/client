import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { MembreGroupeService } from "../../../groupe/groupe-show/membre-groupe/membre-groupe.service";
import { AffectationTacheService } from "../../affectation-tache/affectation-tache.service";
import { TunelService } from "../tunel.service";

@Component({
  selector: "app-tunel-create",
  templateUrl: "./tunel-create.component.html",
  styleUrls: ["./tunel-create.component.scss"],
})
export class TunelCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  user: any; // personne avec laquelle le user connécté crée un tunel
  dependancies = {
    affectation_taches: [],
    membres: [],
  };

  loadingDependancies = {
    affectation_tache: false,
    membre: false,
  };

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
      text: this.helper?.getTranslation("selctionnerLesMembres"),
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: true,
      allowSearchFilter: true,
      disabled: false,
    },
    users: {
      text: this.helper?.getTranslation("selctionnerLesMembres"),
      enableSearchFilter: true,
      primaryKey: "id",
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    },
  };

  constructor(
    public tunelService: TunelService,
    public affectationTacheService: AffectationTacheService,
    public membreGroupeService: MembreGroupeService
  ) {
    super(tunelService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();
    this.initialiseForm();

    this._subscription["user"] = this.tunelService.user$.subscribe((user) => {
      this.user = user;
      this.getAffectations(this.user.id_inscription);
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      libelle: ["", Validators.required],
      affectation_tache: ["", Validators.required],
      membres: [""],
    });

    this.form.controls.affectation_tache.valueChanges.subscribe(
      (affectation) => {
        this.getMembres(affectation[0].groupe_details.id);
        this.formValuePatcher("membres", "");
      }
    );

    this.isFormOk = true;
  }

  getAffectations(user: number) {
    this.loadingDependancies.affectation_tache = true;
    this.affectationTacheService.getByUser(user).subscribe((affectations) => {
      this.dependancies.affectation_taches = affectations;
      this.loadingDependancies.affectation_tache = false;
    });
  }

  getMembres(groupe: any) {
    this.loadingDependancies.membre = true;
    this.membreGroupeService.get(groupe).subscribe((membres) => {
      this.dependancies.membres = membres
        .map((item: any) => item.membre_details)
        .filter(
          (item: any) =>
            item.id != this.user.id && this.auth.user.id_inscription != item.id
        );
      this.loadingDependancies.membre = false;
    });
  }

  create() {
    this.loading = true;

    const participants = [...this.formValue("membres")];

    const data = {
      libelle: this.formValue("libelle"),
      affectation_tache: this.formValue("affectation_tache")[0].id,
      participants: [
        ...this.helper.idExtractor(participants),
        ...[this.user.id_inscription],
      ],
    };

    this.tunelService
      .add(this.helper.omitNullValueInObject(data))
      .subscribe(() => {
        this.form.reset();
        this.loading = false;
        this.helper.toggleModal("tunel-create-modal");
      });
  }
}
