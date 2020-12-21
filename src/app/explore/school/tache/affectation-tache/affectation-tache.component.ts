import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-affectation-tache",
  templateUrl: "./affectation-tache.component.html",
  styleUrls: ["./affectation-tache.component.scss"],
})
export class AffectationTacheComponent implements OnInit {
  affecterTache: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
