import { BaseSingleComponent } from "./../../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { ProfesseurService } from "../professeur.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-professeur-show",
  templateUrl: "./professeur-show.component.html",
  styleUrls: ["./professeur-show.component.scss"],
})
export class ProfesseurShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public professeurService: ProfesseurService,
    public route: ActivatedRoute
  ) {
    super(professeurService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
