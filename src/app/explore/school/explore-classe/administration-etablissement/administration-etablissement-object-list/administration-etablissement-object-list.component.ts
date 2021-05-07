import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";

@Component({
  selector: "app-administration-etablissement-object-list",
  templateUrl: "./administration-etablissement-object-list.component.html",
  styleUrls: ["./administration-etablissement-object-list.component.scss"],
})
export class AdministrationEtablissementObjectListComponent
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
    super.ngOnInit();
  }
}
