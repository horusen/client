import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-tunel",
  templateUrl: "./tunel.component.html",
  styleUrls: ["./tunel.component.scss"],
})
export class TunelComponent implements OnInit {
  afficherTunelCreate: boolean = false;
  constructor(public helper: Helper) {}

  ngOnInit(): void {}
}
