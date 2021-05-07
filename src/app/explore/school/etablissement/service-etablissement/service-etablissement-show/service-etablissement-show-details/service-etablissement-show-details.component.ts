import { ServiceEtablissementService } from "./../../service-etablissement.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-service-etablissement-show-details",
  templateUrl: "./service-etablissement-show-details.component.html",
  styleUrls: ["./service-etablissement-show-details.component.scss"],
})
export class ServiceEtablissementShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public serviceEtablissementService: ServiceEtablissementService,
    public route: ActivatedRoute
  ) {
    super(serviceEtablissementService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
