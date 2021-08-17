import { TypeRelationFamilialeService } from "./../../relation-familiale/type-relation-familiale.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { RelationFamilialeService } from "../../relation-familiale/relation-familiale.service";
import { Validators } from "@angular/forms";
import { UserService } from "src/app/zental/user/user.service";

@Component({
  selector: "app-ajouter-membre-famille",
  templateUrl: "./ajouter-membre-famille.component.html",
  styleUrls: ["./ajouter-membre-famille.component.scss"],
})
export class AjouterMembreFamilleComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() user: any;
  @Input() type: string;
  @Output() done = new EventEmitter();
  dependancies = {
    types: [],
    users: [],
  };

  dependanciesLoading = {
    types: false,
    users: false,
  };

  constructor(
    public relationFamillialeService: RelationFamilialeService,
    public typeRelationFamilialeService: TypeRelationFamilialeService,
    public userService: UserService
  ) {
    super(relationFamillialeService);
  }

  ngOnInit(): void {
    if (!this.user) {
      this.helper.toastDanger(
        "Le user n'est pas specifié dans ajouter-membre-famille component"
      );
    }

    if (!this.type) {
      this.helper.toastDanger(
        "Le type n'est pas specifié dans ajouter-membre-famille component"
      );
    }

    this.initialiseForm();

    this.getDependancies();

    // add newly created user to dependancies.users
    this._subscription["user"] = this.userService.lastItemcreated$.subscribe(
      (user) => {
        this.dependancies.users.unshift(user);
      }
    );
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      membre_famille: [null, Validators.required],
      user: [this.user.id_inscription, Validators.required],
      type: [null, Validators.required],
    });

    this.isFormOk = true;
  }

  fillTypeMembreFamilialeFormField(type: string): void {
    const typeRelationFamilale = this.dependancies.types.find(
      (item) => item.libelle === type
    );
    if (typeRelationFamilale) {
      this.formValuePatcher("type", typeRelationFamilale.id);
    } else {
      this.helper.alertDanger("Type membre famille invalide");
    }
  }

  getDependancies(): void {
    this.getNonMembresFamilles(this.user.id_inscription);

    this.getTypesRelationsFamiliales(() => {
      this.fillTypeMembreFamilialeFormField(this.type);
    });
  }

  getTypesRelationsFamiliales(callback?: Function): void {
    this.dependanciesLoading.types = true;
    this.typeRelationFamilialeService.getAll(false).subscribe((response) => {
      this.dependancies.types = response;
      this.dependanciesLoading.types = false;

      if (callback) callback();
    });
  }

  getNonMembresFamilles(user: number): void {
    this.dependanciesLoading.users = true;
    this.userService.getNonMembresFamilles(user).subscribe((response) => {
      this.dependancies.users = response;
      this.dependanciesLoading.users = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        membre_famille: this.formValue("membre_famille")[0].id_inscription,
      };

      this.relationFamillialeService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.fillTypeMembreFamilialeFormField(this.type);
        this.helper.hideModal("ajouter-membre-famille-modal");
        this.done.emit();
        this.helper.alertSuccess();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
