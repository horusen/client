import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-suivie-tache",
  templateUrl: "./suivie-tache.component.html",
  styleUrls: ["./suivie-tache.component.scss"],
})
export class SuivieTacheComponent implements OnInit {
  affecterTache: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
