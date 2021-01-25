import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../etablissement.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-etablissement-show",
  templateUrl: "./etablissement-show.component.html",
  styleUrls: ["./etablissement-show.component.scss"],
})
export class EtablissementShowComponent
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
