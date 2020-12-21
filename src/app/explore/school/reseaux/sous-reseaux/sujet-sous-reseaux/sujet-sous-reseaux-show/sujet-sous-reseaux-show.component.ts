import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { SujetSousReseauxService } from "../sujet-sous-reseaux.service";

@Component({
  selector: "app-sujet-sous-reseaux-show",
  templateUrl: "./sujet-sous-reseaux-show.component.html",
  styleUrls: ["./sujet-sous-reseaux-show.component.scss"],
})
export class SujetSousReseauxShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public sujetService: SujetSousReseauxService,
    public route: ActivatedRoute
  ) {
    super(sujetService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe((params) => {
      if (params["sujet"]) {
        this.helper.toggleModal("sujet-reseaux-show-modal");
        this.getItem(params["sujet"]);
      }
    });
  }

  getItem(sujet: number) {
    this.loading = true;
    this.sujetService.getSingle(sujet).subscribe(() => {
      this.loading = false;
    });
  }

  editer() {}

  supprimer() {}
}
