import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SousDomaineService } from "src/app/explore/school/sous-domaine/sous-domaine.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { SujetSousReseauxService } from "../sujet-sous-reseaux.service";

@Component({
  selector: "app-sujet-sous-reseaux-list",
  templateUrl: "./sujet-sous-reseaux-list.component.html",
  styleUrls: ["./sujet-sous-reseaux-list.component.scss"],
})
export class SujetSousReseauxListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public sujetService: SujetSousReseauxService,
    public route: ActivatedRoute,
    public sousDomaineService: SousDomaineService
  ) {
    super(sujetService);
  }

  ngOnInit(): void {
    this._subscription[
      "sous_domaine"
    ] = this.sousDomaineService.singleData$.subscribe((sousDomaine) => {
      this.getData(sousDomaine.id);
    });
    // this.route.parent.params.subscribe((params) => {
    //   console.log(params);
    //   this.getData(params["id"]);
    // });
  }

  getData(sousDomaine: number) {
    this.loading = true;
    this.sujetService.getBySousDomaine(sousDomaine).subscribe(() => {
      this.loading = false;
    });
  }
}
