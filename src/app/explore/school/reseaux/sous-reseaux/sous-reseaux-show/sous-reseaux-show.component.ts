import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { SousDomaineService } from "../../../sous-domaine/sous-domaine.service";

@Component({
  selector: "app-sous-reseaux-show",
  templateUrl: "./sous-reseaux-show.component.html",
  styleUrls: ["./sous-reseaux-show.component.scss"],
})
export class SousReseauxShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public sousDomaineService: SousDomaineService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(sousDomaineService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
