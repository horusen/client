import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ProfesseurService } from "../../professeur.service";

@Component({
  selector: "app-professeur-show-details",
  templateUrl: "./professeur-show-details.component.html",
  styleUrls: ["./professeur-show-details.component.scss"],
})
export class ProfesseurShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public professeurService: ProfesseurService,
    public route: ActivatedRoute
  ) {
    super(professeurService, route);
  }

  ngOnInit(): void {
    this.enableSubscribeToLoading = true;
    super.ngOnInit();
  }
}
