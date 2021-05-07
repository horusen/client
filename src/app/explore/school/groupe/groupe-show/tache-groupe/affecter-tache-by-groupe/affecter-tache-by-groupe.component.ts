import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { GroupeService } from "../../../groupe.service";

@Component({
  selector: "app-affecter-tache-by-groupe",
  templateUrl: "./affecter-tache-by-groupe.component.html",
  styleUrls: ["./affecter-tache-by-groupe.component.scss"],
})
export class AffecterTacheByGroupeComponent implements OnInit {
  groupe: any;
  groupeSubcription: Subscription;
  constructor(public groupeService: GroupeService) {}

  ngOnInit(): void {
    this.groupeSubcription = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.groupe = groupe;
      }
    );
  }
}
