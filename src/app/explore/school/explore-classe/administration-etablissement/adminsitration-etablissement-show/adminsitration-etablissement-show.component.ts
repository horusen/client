import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AuthService } from "src/app/authentification/auth.service";
import { EtablissementService } from "../../../etablissement/etablissement.service";

@Component({
  selector: "app-adminsitration-etablissement-show",
  templateUrl: "./adminsitration-etablissement-show.component.html",
  styleUrls: ["./adminsitration-etablissement-show.component.scss"],
})
export class AdminsitrationEtablissementShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router,
    public auth: AuthService
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.loading = true;
      let etablissement = this.helper.parseInt(param["id"]);

      this.getPrivilege(etablissement).subscribe((privilege) => {
        if (privilege.isAdmin || privilege.isChargerCom) {
          this.getEtablissement(etablissement).subscribe(() => {
            this.loading = false;
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
