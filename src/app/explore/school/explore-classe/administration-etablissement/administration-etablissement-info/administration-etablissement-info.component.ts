import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";

@Component({
  selector: "app-administration-etablissement-info",
  templateUrl: "./administration-etablissement-info.component.html",
  styleUrls: ["./administration-etablissement-info.component.scss"],
})
export class AdministrationEtablissementInfoComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    this.enableEmitLoading = true;
    super.ngOnInit();
  }
}
