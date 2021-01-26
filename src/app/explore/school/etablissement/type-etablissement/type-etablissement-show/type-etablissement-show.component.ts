import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { TypeEtablissementService } from "../type-etablissement.service";

@Component({
  selector: "app-type-etablissement-show",
  templateUrl: "./type-etablissement-show.component.html",
  styleUrls: ["./type-etablissement-show.component.scss"],
})
export class TypeEtablissementShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public typeEtablissementService: TypeEtablissementService,
    public route: ActivatedRoute
  ) {
    super(typeEtablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
