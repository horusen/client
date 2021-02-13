import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { UserService } from "../../../user/user.service";
import { AdminEtablissementService } from "../admin-etablissement.service";
import { EtablissementService } from "../../etablissement.service";

@Component({
  selector: "app-admin-etablissement-add",
  templateUrl: "./admin-etablissement-add.component.html",
  styleUrls: ["./admin-etablissement-add.component.scss"],
})
export class AdminEtablissementAddComponent
  extends BaseCreateComponent
  implements OnInit {
  etablissement: any;
  getNonAdminLoading: boolean = false;
  nonAdmin: any = [];

  constructor(
    public adminService: AdminEtablissementService,
    public userService: UserService,
    public etablissementService: EtablissementService
  ) {
    super(adminService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.initialiseForm(etablissement.id);
      this.getNonAdmin(etablissement.id);
    });

    this._subscription[
      "lastItemDeleted"
    ] = this.adminService.lastItemDeleted$.subscribe((item) => {
      this.nonAdmin.unshift(item.admin_details);
    });
  }

  initialiseForm(etablissement: number) {
    this.form = this.fb.group({
      admins: [[], Validators.required],
      etablissement: [etablissement, Validators.required],
    });

    this.isFormOk = true;
  }

  getNonAdmin(etablissement: number) {
    this.getNonAdminLoading = true;
    this.userService
      .getNonAdminOnEtablissement(etablissement)
      .subscribe((users) => {
        this.nonAdmin = users;
        this.getNonAdminLoading = false;
      });
  }

  create() {
    this.loading = true;
    const data = {
      admins: this.helper.idExtractor(
        this.formValue("admins"),
        "id_inscription"
      ),
      ...this.helper.omitFieldInObject(this.form.value, ["admins"]),
    };

    this.adminService.add(data).subscribe((admins) => {
      this.loading = false;

      // Delete new Admins in Non admins array
      const adminIDs = admins.map(
        (admin) => admin.admin_details.id_inscription
      );
      this.nonAdmin = this.nonAdmin.filter((item) =>
        adminIDs.includes(item.id_inscription)
      );
      this.formValuePatcher("admins", []);
      this.helper.toggleModal("admin-etablissement-add-modal");
    });
  }
}
