import { Helper } from "src/app/shared/services/helper";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-institution-details",
  templateUrl: "./institution-details.component.html",
  styleUrls: ["./institution-details.component.scss"],
})
export class InstitutionDetailsComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  editHistoire = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public helper: Helper
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-histoire") {
        this.editHistoire = true;
        this.helper.toggleModal("histoire-modal");
      }
    });
  }

  histoireEditedHandler(histoire: string): void {
    this.parent.item.entite_diplomatique.histoire = histoire;
    this.helper.toggleModal("histoire-modal");
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
