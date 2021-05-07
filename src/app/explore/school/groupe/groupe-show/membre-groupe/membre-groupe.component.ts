import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";
import { GroupeService } from "../../groupe.service";

@Component({
  selector: "app-membre-groupe",
  templateUrl: "./membre-groupe.component.html",
  styleUrls: ["./membre-groupe.component.scss"],
})
export class MembreGroupeComponent implements OnInit {
  activeAddComponent: boolean = false;
  groupeSubscription: Subscription;
  groupe: any;
  constructor(public helper: Helper, public groupeService: GroupeService) {}

  ngOnInit(): void {
    this.groupeSubscription = this.groupeService.singleData$.subscribe(
      (groupe) => (this.groupe = groupe)
    );
  }
}
