import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-ministere",
  templateUrl: "./ministere.component.html",
  styleUrls: ["./ministere.component.scss"],
})
export class MinistereComponent extends BaseComponent implements AfterViewInit {
  create = false;
  constructor(public route: ActivatedRoute, public router: Router) {
    super();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "add-ministere") {
        this.ajouter();
      }
    });
  }

  ajouter() {
    this.create = true;
    this.helper.toggleModal("ministere-add-modal");
  }
}
