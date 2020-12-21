import { SolutionTacheService } from "./../solution-tache.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-solution-tache-show",
  templateUrl: "./solution-tache-show.component.html",
  styleUrls: ["./solution-tache-show.component.scss"],
})
export class SolutionTacheShowComponent
  extends BaseSingleComponent
  implements OnInit {
  suivie: boolean = false; // Renseigne si on est dans la section suivie ou dans la section explore
  afficherRemarque: boolean = false;
  constructor(
    public solutionTacheService: SolutionTacheService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(solutionTacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.router.url.includes("suivie")) this.suivie = true;
  }

  editer() {
    this.helper.toggleModal("solution-tache-show-modal");
    this.helper.toggleModal("solution-tache-edit-modal");
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.solutionTacheService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal("solution-tache-show-modal");
      });
    });
  }
}
