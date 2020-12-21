import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AffectationTacheService } from "../affectation-tache/affectation-tache.service";

@Component({
  selector: "app-solution-tache",
  templateUrl: "./solution-tache.component.html",
  styleUrls: ["./solution-tache.component.scss"],
})
export class SolutionTacheComponent implements OnInit {
  affectationTacheSubscription: Subscription;
  affectationTache: any;
  constructor(public affectationTacheService: AffectationTacheService) {}

  ngOnInit(): void {
    this.affectationTacheSubscription = this.affectationTacheService.singleData$.subscribe(
      (affectation) => {
        this.affectationTache = affectation;
      }
    );
  }
}
