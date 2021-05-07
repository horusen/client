import { BaseComponent } from "./../../../shared/components/base-component/base.component";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TacheService } from "./tache.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-tache",
  templateUrl: "./tache.component.html",
  styleUrls: ["./tache.component.scss"],
})
export class TacheComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  addTache: boolean = false;
  constructor(
    public tacheService: TacheService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(tacheService);
  }

  ngOnInit(): void {}

  ajouter() {
    this.addTache = true;
    this.helper.toggleModal("tache-create-modal");
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment == "add-tache") {
        this.ajouter();
      }
    });
  }
}
