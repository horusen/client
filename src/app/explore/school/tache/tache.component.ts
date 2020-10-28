import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "./tache.service";

@Component({
  selector: "app-tache",
  templateUrl: "./tache.component.html",
  styleUrls: ["./tache.component.scss"],
})
export class TacheComponent implements OnInit {
  showTacheCreate: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
