import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../../eleve.service";
import { ProfesseurService } from "../../../professeur/professeur.service";

@Component({
  selector: "app-eleve-show-professeur",
  templateUrl: "./eleve-show-professeur.component.html",
  styleUrls: ["./eleve-show-professeur.component.scss"],
})
export class EleveShowProfesseurComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public professeurService: ProfesseurService,
    public eleveService: EleveService,
    public route: ActivatedRoute
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this._subscription["eleve"] = this.eleveService.singleData$.subscribe(
        (eleve) => {
          this.getData(eleve.id, queryParams);
        }
      );
    });
  }

  getData(eleve: number, params: Params) {
    this.loading = true;
    this.professeurService.getByEleve(eleve, params).subscribe(() => {
      this.loading = false;
    });
  }
}
