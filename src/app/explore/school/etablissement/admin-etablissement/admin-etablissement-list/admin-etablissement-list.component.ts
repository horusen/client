import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement.service";
import { AdminEtablissementService } from "../admin-etablissement.service";

@Component({
  selector: "app-admin-etablissement-list",
  templateUrl: "./admin-etablissement-list.component.html",
  styleUrls: ["./admin-etablissement-list.component.scss"],
})
export class AdminEtablissementListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public adminService: AdminEtablissementService,
    public etablissementService: EtablissementService
  ) {
    super(adminService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) =>
      this.getByEtablissement(etablissement.id)
    );
  }

  getByEtablissement(etablissement: number) {
    this.loading = true;
    this.adminService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }

  delete(id: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.adminService.delete(id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
