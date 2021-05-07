import { EventEmitter } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";
import { SidebarCollapseButtonService } from "../sidebar-collapse-button.service";

@Component({
  selector: "app-sidebar-collapse-button",
  templateUrl: "./sidebar-collapse-button.component.html",
  styleUrls: ["./sidebar-collapse-button.component.scss"],
})
export class SidebarCollapseButtonComponent implements OnInit {
  collapsed: boolean = false;

  constructor(
    public sidebarCollapseButtonService: SidebarCollapseButtonService
  ) {}

  ngOnInit(): void {}

  collapse() {
    this.collapsed = !this.collapsed;
    this.sidebarCollapseButtonService.collapsed$.next(this.collapsed);
  }
}
