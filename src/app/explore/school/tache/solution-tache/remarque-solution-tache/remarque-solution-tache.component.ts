import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { SolutionTacheService } from "../solution-tache.service";
import { RemarqueSolutionTacheService } from "./remarque-solution-tache.service";

@Component({
  selector: "app-remarque-solution-tache",
  templateUrl: "./remarque-solution-tache.component.html",
  styleUrls: ["./remarque-solution-tache.component.scss"],
})
export class RemarqueSolutionTacheComponent
  extends BaseComponent
  implements OnInit {
  activeComponents = {
    add: false,
    edit: false,
    show: false,
  };
  constructor(
    public remarqueService: RemarqueSolutionTacheService,
    public solutionService: SolutionTacheService
  ) {
    super(remarqueService);
  }

  ngOnInit(): void {
    this._subscription["solution"] = this.solutionService.singleData$.subscribe(
      (solution) => {
        this.getRemarque(solution.id);
      }
    );

    this._subscription["single"] = this.remarqueService.singleData$.subscribe(
      (remarque) => {
        remarque
          ? this.activateComponent("show")
          : this.activateComponent("add");
      }
    );
  }

  getRemarque(solution: number) {
    this.loading = true;
    this.remarqueService.get(solution).subscribe(() => {
      this.loading = false;
    });
  }

  activateComponent(component: string) {
    this.resetComponent();
    this.activeComponents[component] = true;
  }

  resetComponent() {
    Object.keys(this.activeComponents).forEach((key) => {
      this.activeComponents[key] = false;
    });
  }
}
