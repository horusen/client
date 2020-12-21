import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../../affectation-tache/affectation-tache.service";
import { SolutionTacheService } from "../solution-tache.service";

@Component({
  selector: "app-solution-tache-list",
  templateUrl: "./solution-tache-list.component.html",
  styleUrls: ["./solution-tache-list.component.scss"],
})
export class SolutionTacheListComponent
  extends BaseComponent
  implements OnInit {
  suivie: boolean = false; // Renseigne si on est dans la section suivie ou dans la section explore
  autresSolutionsLoading: boolean = false;
  affectationTache: any;
  constructor(
    public solutionService: SolutionTacheService,
    public affectationTacheService: AffectationTacheService,
    public router: Router
  ) {
    super(solutionService);
  }

  ngOnInit(): void {
    if (this.router.url.includes("suivie")) {
      this.getByProfesseur();
      this.suivie = true;
    } else {
      this._subscription[
        "affectationTache"
      ] = this.affectationTacheService.singleData$.subscribe(
        (affectationTache) => {
          this.affectationTache = affectationTache;
          this.getByAffectation(affectationTache.id);

          if (affectationTache.etat == "TERMINE") {
            this.getAutresSolution(affectationTache.id);
          }
        }
      );
    }
  }

  getByProfesseur() {
    this.loading = true;
    this.solutionService.getByProfesseur().subscribe(() => {
      this.loading = false;
    });
  }

  getByAffectation(affectationTache: number) {
    this.loading = true;
    this.solutionService.get(affectationTache).subscribe(() => {
      this.loading = false;
    });
  }

  getAutresSolution(affectationTache: number) {
    this.autresSolutionsLoading = true;
    this.solutionService.getAutresSolutions(affectationTache).subscribe(() => {
      this.autresSolutionsLoading = false;
    });
  }
}
