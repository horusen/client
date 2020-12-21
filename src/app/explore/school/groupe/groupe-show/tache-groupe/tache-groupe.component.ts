import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tache-groupe",
  templateUrl: "./tache-groupe.component.html",
  styleUrls: ["./tache-groupe.component.scss"],
})
export class TacheGroupeComponent implements OnInit {
  affecterTache: boolean = false; // Permet d'activer le component d'affectation entre groupe et tache
  constructor() {}

  ngOnInit(): void {}
}
