import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../affectation-tache/affectation-tache.service";

@Component({
  selector: "app-suivie-tache",
  templateUrl: "./suivie-tache.component.html",
  styleUrls: ["./suivie-tache.component.scss"],
})
export class SuivieTacheComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  affecterTache: boolean = false;
  constructor(
    public suivieService: AffectationTacheService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(suivieService);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "affecter-tache") {
        this.affecter();
      }
    });
  }

  affecter() {
    this.affecterTache = true;
    this.helper.toggleModal("affectation-tache-modal");
  }
}
