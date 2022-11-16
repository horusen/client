import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { InstitutionService } from "./institution.service";

@Component({
  selector: "app-institution",
  templateUrl: "./institution.component.html",
  styleUrls: ["./institution.component.scss"],
})
export class InstitutionComponent implements OnInit, OnDestroy {
  @Input() parent: { name: string; item: any };
  @Input() showNavigation = true;
  constructor(public institutionService: InstitutionService) {}

  ngOnInit(): void {
    this.institutionService.parent = this.parent;
  }

  ngOnDestroy(): void {
    this.institutionService.parent = null;
  }
}
