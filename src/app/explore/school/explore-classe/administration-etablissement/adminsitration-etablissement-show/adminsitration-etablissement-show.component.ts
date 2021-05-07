import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AuthService } from "src/app/authentification/auth.service";
import { EtablissementService } from "../../../etablissement/etablissement.service";
import { ChargerCommunicationEtablissementService } from "../../../etablissement/admin-etablissement/charger-communication-etablissement/charger-communication-etablissement.service";
import { SidebarCollapseButtonService } from "../../../shared-school/sidebar-collapse-button.service";

@Component({
  selector: "app-adminsitration-etablissement-show",
  templateUrl: "./adminsitration-etablissement-show.component.html",
  styleUrls: ["./adminsitration-etablissement-show.component.scss"],
})
export class AdminsitrationEtablissementShowComponent
  extends BaseSingleComponent
  implements OnInit {
  collapseSideBar: boolean = false;
  constructor(
    public etablissementService: EtablissementService,
    public chargerComService: ChargerCommunicationEtablissementService,
    public sidebarCollapseButtonService: SidebarCollapseButtonService,
    public route: ActivatedRoute,
    public router: Router,
    public auth: AuthService
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this._subscription[
      "collpase-button"
    ] = this.sidebarCollapseButtonService.collapsed$.subscribe(
      (collapse) => (this.collapseSideBar = collapse)
    );

    this.route.params.subscribe((param) => {
      this.loading = true;
      let etablissement = this.helper.parseInt(param["id"]);

      this.getPrivilege(etablissement).subscribe((privilege) => {
        if (privilege.isAdmin || privilege.isChargerCom) {
          this.getEtablissement(etablissement).subscribe(() => {
            this.loading = false;
            this.chargerComService
              .getByEtablissement(etablissement)
              .subscribe();
          });
        } else {
          this.router.navigate(["school", "echo"]);
        }
      });
    });
    super.ngOnInit();
  }

  getPrivilege(etablissement: number) {
    return this.etablissementService.getCurrentUserPrivilege(etablissement);
  }

  getEtablissement(etablissement: number) {
    return this.etablissementService.getSingle(etablissement);
  }
}
