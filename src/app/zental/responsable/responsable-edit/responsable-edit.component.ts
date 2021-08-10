import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/user/user.service";
import { ResponsableCreateComponent } from "../responsable-create/responsable-create.component";
import { ResponsableService } from "../responsable.service";

@Component({
  selector: "app-responsable-edit",
  templateUrl: "./responsable-edit.component.html",
  styleUrls: ["./responsable-edit.component.scss"],
})
export class ResponsableEditComponent
  extends ResponsableCreateComponent
  implements OnInit
{
  @Input() parent: { name: string; entiteDiplomatique: any; item: any };
  constructor(
    public responsableService: ResponsableService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(responsableService, userService, router, route);
  }

  ngOnInit(): void {
    this.actuelResponsable = !!this.router.url.includes("actuel");

    this.initialiseForm(this.parent.item);

    this.getUsers();
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        responsable: this.formValue("employe")[0].id_inscription,
      });
      this.responsableService
        .update(this.parent.item.id, data)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
          this.helper.toggleModal(this.parent.name + "-edit-modal");
          this.initialiseForm();
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
