import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar-explore-school",
  templateUrl: "./sidebar-explore-school.component.html",
  styleUrls: ["./sidebar-explore-school.component.scss"],
})
export class SidebarExploreSchoolComponent implements OnInit {
  public activeComponents = {
    tableaux: true,
    classe: false,
    groupe: false,
  };

  constructor() {}

  ngOnInit(): void {}

  activateComponent(component: string): void {
    if (!this.activateComponent[component]) {
      this.desactivateComponents();
      this.activeComponents[component] = true;
    }
  }

  private desactivateComponents(): void {
    Object.keys(this.activeComponents).forEach(
      (key) => (this.activeComponents[key] = false)
    );
  }
}
