import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { TacheService } from "../tache.service";

@Component({
  selector: "app-tache-show",
  templateUrl: "./tache-show.component.html",
  styleUrls: ["./tache-show.component.scss"],
})
export class TacheShowComponent extends BaseSingleComponent implements OnInit {
  constructor(public tacheService: TacheService, public route: ActivatedRoute) {
    super(tacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getTache(params["id"]);
      }
    });
  }

  getTache(tache: number) {
    this.loading = true;
    this.tacheService.getSingle(tache).subscribe(() => {
      this.loading = false;
    });
  }
}
