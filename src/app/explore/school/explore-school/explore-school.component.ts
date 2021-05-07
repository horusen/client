import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { SidebarCollapseButtonService } from "../shared-school/sidebar-collapse-button.service";

@Component({
  selector: "app-explore-school",
  templateUrl: "./explore-school.component.html",
  styleUrls: ["./explore-school.component.scss"],
})
export class ExploreSchoolComponent implements OnInit {
  sidebarCollapsed: boolean = false;
  sidebarCollapseButtonSubscription: Subscription;
  constructor(
    public sidebarCollapseButtonService: SidebarCollapseButtonService
  ) {}

  ngOnInit(): void {
    this.sidebarCollapseButtonSubscription = this.sidebarCollapseButtonService.collapsed$.subscribe(
      (collapsed) => {
        this.sidebarCollapsed = collapsed;
      }
    );
  }

  ngOnDestroy() {
    this.sidebarCollapseButtonSubscription.unsubscribe();
  }
}
