import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { SolutionTacheService } from "../../solution-tache.service";

@Component({
  selector: "app-solution-tache-solo",
  templateUrl: "./solution-tache-solo.component.html",
  styleUrls: ["./solution-tache-solo.component.scss"],
})
export class SolutionTacheSoloComponent
  extends BaseComponent
  implements OnInit {
  @Input() solution: any;
  constructor(public solutionService: SolutionTacheService) {
    super(solutionService);
  }

  voirSolution() {
    this.solutionService.singleData = this.solution;
    this.helper.toggleModal("solution-tache-show-modal");
  }

  ngOnInit(): void {}
}
