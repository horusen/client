import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { TacheService } from "../../../tache.service";

@Component({
  selector: "app-tache-details-min",
  templateUrl: "./tache-details-min.component.html",
  styleUrls: ["./tache-details-min.component.scss"],
})
export class TacheDetailsMinComponent
  extends BaseSingleComponent
  implements OnInit {
  public activeComponent = {
    details: false,
    professeur: false,
    groupe: false,
    fichier: false,
  };
  constructor(
    public tacheService: TacheService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(tacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const fragment = this.route.snapshot.fragment;
    switch (fragment) {
      case "details":
        this.activateComponent("details");
        break;
      case "professeur":
        this.activateComponent("professeur");
        break;
      case "groupe":
        this.activateComponent("groupe");
        break;
      case "fichier":
        this.activateComponent("fichier");
        break;

      default:
        break;
    }
  }

  activateComponent(component: string) {
    if (this.activeComponent[component]) {
      this.resetComponent();
    } else {
      this.resetComponent();
      this.activeComponent[component] = true;
    }
  }

  resetComponent() {
    Object.keys(this.activeComponent).forEach((key) => {
      this.activeComponent[key] = false;
    });
  }
}
