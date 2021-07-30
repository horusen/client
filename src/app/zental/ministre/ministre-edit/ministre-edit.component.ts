import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/user/user.service";
import { MinistereService } from "../../ministere/ministere.service";
import { MinistreCreateComponent } from "../ministre-create/ministre-create.component";
import { MinistreService } from "../ministre.service";

@Component({
  selector: "app-ministre-edit",
  templateUrl: "./ministre-edit.component.html",
  styleUrls: ["./ministre-edit.component.scss"],
})
export class MinistreEditComponent
  extends MinistreCreateComponent
  implements OnInit
{
  single: any;
  constructor(
    public ministereService: MinistereService,
    public ministreService: MinistreService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministereService, ministreService, userService, router, route);
  }

  ngOnInit(): void {
    this.actuelMinistre = !!this.router.url.includes("actuel");
    Object.assign(this.dropdownSettingsAlt.user, {
      disabled: true,
    });

    this._subscription["ministre"] = this.ministreService.singleData$.subscribe(
      (ministre) => {
        this.single = ministre;
        this.form = this.initialiseForm(this.single);
        this.isFormOk = true;
      }
    );

    this.getUsers();
  }

  initialiseForm(ministre: any): FormGroup {
    return this.fb.group({
      ministre: [[ministre.ministre]],
      ministere: ministre.ministere,
      debut_fonction: ministre.debut_fonction,
      fin_fonction: ministre.fin_fonction,
      biographie: ministre.biographie,
    });
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        ministre: this.formValue("ministre")[0].id_inscription,
      });
      this.ministreService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("ministre-edit-modal");
        this.initialiseForm(this.single);
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
