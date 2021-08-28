import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-identite-information",
  templateUrl: "./identite-information.component.html",
  styleUrls: ["./identite-information.component.scss"],
})
export class IdentiteInformationComponent implements OnInit {
  @Input() user: any;
  @Input() currentUser = false;
  constructor() {}

  ngOnInit(): void {}
}
