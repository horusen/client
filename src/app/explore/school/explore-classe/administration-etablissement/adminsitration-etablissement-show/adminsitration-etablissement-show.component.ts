import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
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
    public router: Router
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    if (!this.router.url.includes("classe")) {
      this.router.navigate(["classe"], { relativeTo: this.route });
    }
  }
}
