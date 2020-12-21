import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DomaineService } from "../../domaine/domaine.service";
import { SousDomaineService } from "../../sous-domaine/sous-domaine.service";

@Component({
  selector: "app-reseaux-show",
  templateUrl: "./reseaux-show.component.html",
  styleUrls: ["./reseaux-show.component.scss"],
})
export class ReseauxShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public domaineService: DomaineService,
    public sousDomaineService: SousDomaineService
  ) {
    super(domaineService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    this.route.params.subscribe(() => {
      this.sousDomaineService.singleData = null;
    });
  }

  getDomaine(domaine: number) {
    return this.domaineService.data.find((item) => item.id == domaine);
  }
}
