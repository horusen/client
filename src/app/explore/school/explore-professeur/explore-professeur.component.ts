import { Component, OnInit } from "@angular/core";
import { ExploreSchoolComponent } from "../explore-school/explore-school.component";
import { SidebarCollapseButtonService } from "../shared-school/sidebar-collapse-button.service";

@Component({
  selector: "app-explore-professeur",
  templateUrl: "./explore-professeur.component.html",
  styleUrls: ["./explore-professeur.component.scss"],
})
export class ExploreProfesseurComponent extends ExploreSchoolComponent {
  constructor(
    public sidebarCollapseButtonService: SidebarCollapseButtonService
  ) {
    super(sidebarCollapseButtonService);
  }
}
