import { RelationInterpersonnelleService } from "./../relation-interpersonnelle.service";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { TypeRelationService } from "../../type-relation/type-relation.service";
import { UserService } from "../../user/user.service";
import { Validators } from "@angular/forms";
import { IdentiteService } from "../../identite/identite.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-relation-interpersonnelle-create",
  templateUrl: "./relation-interpersonnelle-create.component.html",
  styleUrls: ["./relation-interpersonnelle-create.component.scss"],
})
export class RelationInterpersonnelleCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  user: any;
  dependancies = {
    types: [],
    users: [],
  };

  dependanciesLoading = {
    types: false,
    users: false,
  };

  constructor(
    public relationService: RelationInterpersonnelleService,
    public typeRelationService: TypeRelationService,
    public userService: UserService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(relationService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
      }
    );

    this.initialiseForm();

    this.getDependancies();

    // add newly created user to dependancies.users
    this._subscription["user"] = this.userService.lastItemcreated$.subscribe(
      (user) => {
        this.dependancies.users.unshift(user);
      }
    );
  }

  getDependancies(): void {
    this.getNonRelations(this.user.id_inscription);

    this.getTypesRelations();
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      personne_en_relation: [null, Validators.required],
      user: [this.user.id_inscription, Validators.required],
      type_relation: [null, Validators.required],
    });
  }

  getTypesRelations(callback?: Function): void {
    this.dependanciesLoading.types = true;
    this.typeRelationService.getAll(false).subscribe((response) => {
      this.dependancies.types = response;
      this.dependanciesLoading.types = false;

      if (callback) callback();
    });
  }

  getNonRelations(user: number): void {
    this.dependanciesLoading.users = true;
    this.userService.getByNonRelation(user).subscribe((response) => {
      this.dependancies.users = response;
      this.dependanciesLoading.users = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        user1: this.formValue("user"),
        user2: this.formValue("personne_en_relation")[0].id_inscription,
        type_relation: this.formValue("type_relation")[0].id,
      };

      this.relationService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.hideModal("relation-create-modal");
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.alertSuccess();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
