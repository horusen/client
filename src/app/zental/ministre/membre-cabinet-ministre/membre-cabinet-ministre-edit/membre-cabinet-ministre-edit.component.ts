import { MembreCabinetMinistreCreateComponent } from "./../membre-cabinet-ministre-create/membre-cabinet-ministre-create.component";
import { Component, OnInit } from "@angular/core";
import { MembreCabinetMinistreService } from "../membre-cabinet-ministre.service";
import { UserService } from "src/app/zental/user/user.service";
import { PosteService } from "src/app/zental/poste/poste.service";
import { FonctionService } from "src/app/zental/fonction/fonction.service";
import { MinistreService } from "../../ministre.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-membre-cabinet-ministre-edit",
  templateUrl: "./membre-cabinet-ministre-edit.component.html",
  styleUrls: ["./membre-cabinet-ministre-edit.component.scss"],
})
export class MembreCabinetMinistreEditComponent
  extends MembreCabinetMinistreCreateComponent
  implements OnInit
{
  membre: any;
  constructor(
    public membreCabinetService: MembreCabinetMinistreService,
    public userService: UserService,
    public posteService: PosteService,
    public fonctionService: FonctionService,
    public ministreService: MinistreService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      membreCabinetService,
      userService,
      posteService,
      fonctionService,
      ministreService,
      router,
      route
    );
  }

  ngOnInit(): void {
    this._subscription["ministre"] = this.ministreService.singleData$.subscribe(
      (ministre) => {
        this.ministre = ministre;
      }
    );

    // Disabled user field
    Object.assign(this.dropdownSettingsAlt.user, {
      disabled: true,
    });

    this.getDependancies();

    this._subscription["poste"] = this.posteService.lastItemcreated$.subscribe(
      (poste) => {
        this.dependancies.postes.unshift(poste);
      }
    );

    this._subscription["membre"] =
      this.membreCabinetService.singleData$.subscribe((membre) => {
        this.membre = membre;
        this.form = this.initialiseForm(this.membre);
      });
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        poste: this.formValue("poste")[0]?.id,
        membre: this.formValue("membre")[0]?.id_inscription,
        fonction: this.formValue("fonction")[0]?.id,
      });

      this.membreCabinetService.update(this.membre.id, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("membre-cabinet-edit-modal");
        this.form = this.initialiseForm(this.membre);

        // Remove selected membre from users who not members in the cabinet of ministre
        this.dependancies.users = this.dependancies.users.filter(
          (user) => user.id != data.membre
        );
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
