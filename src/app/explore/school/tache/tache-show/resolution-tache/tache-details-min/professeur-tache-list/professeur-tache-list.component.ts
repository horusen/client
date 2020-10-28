import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { TacheService } from "../../../../tache.service";

@Component({
  selector: "app-professeur-tache-list",
  templateUrl: "./professeur-tache-list.component.html",
  styleUrls: ["./professeur-tache-list.component.scss"],
})
export class ProfesseurTacheListComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(public tacheService: TacheService, public route: ActivatedRoute) {
    super(tacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
