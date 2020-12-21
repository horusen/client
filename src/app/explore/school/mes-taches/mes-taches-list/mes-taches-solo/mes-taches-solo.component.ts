import { Component, Input, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-mes-taches-solo",
  templateUrl: "./mes-taches-solo.component.html",
  styleUrls: ["./mes-taches-solo.component.scss"],
})
export class MesTachesSoloComponent implements OnInit {
  @Input() tache: any;
  constructor(public helper: Helper) {}

  ngOnInit(): void {}
}
