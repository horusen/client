import { ExploreSchoolComponent } from "./../explore-school/explore-school.component";
import { Component, OnInit } from "@angular/core";
import { SidebarCollapseButtonService } from "../shared-school/sidebar-collapse-button.service";

@Component({
  selector: "app-explore-groupe",
  templateUrl: "./explore-groupe.component.html",
  styleUrls: ["./explore-groupe.component.scss"],
})
export class ExploreGroupeComponent
  extends ExploreSchoolComponent
  implements OnInit {
  constructor(
    public sidebarCollapseButtonService: SidebarCollapseButtonService
  ) {
    super(sidebarCollapseButtonService);
  }
}
