import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-toloba",
  templateUrl: "./toloba.component.html",
  styleUrls: ["./toloba.component.scss"],
})
export class TolobaComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
