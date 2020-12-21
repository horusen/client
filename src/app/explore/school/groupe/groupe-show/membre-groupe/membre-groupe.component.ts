import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-membre-groupe",
  templateUrl: "./membre-groupe.component.html",
  styleUrls: ["./membre-groupe.component.scss"],
})
export class MembreGroupeComponent implements OnInit {
  activeAddComponent: boolean = false;
  constructor(public helper: Helper) {}

  ngOnInit(): void {}
}
