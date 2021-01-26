import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ServiceEtablissementService } from "../service-etablissement.service";

@Component({
  selector: "app-service-etablissement-show",
  templateUrl: "./service-etablissement-show.component.html",
  styleUrls: ["./service-etablissement-show.component.scss"],
})
export class ServiceEtablissementShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public serviceEtablissementService: ServiceEtablissementService,
    public route: ActivatedRoute
  ) {
    super(serviceEtablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
