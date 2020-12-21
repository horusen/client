import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../classe/classe.service";
import { EleveService } from "../eleve.service";

@Component({
  selector: "app-eleve",
  templateUrl: "./eleve.component.html",
  styleUrls: ["./eleve.component.scss"],
})
export class EleveComponent extends BaseComponent implements OnInit {
  classe: any;
  showData = {
    byClasse: false,
    byProfesseur: false,
  };
  constructor(
    public eleveService: EleveService,
    public classeService: ClasseService,
    public router: Router
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.router.url.includes("professeur")
      ? (this.showData.byProfesseur = true)
      : (this.showData.byClasse = true);
    if (this.showData.byClasse) {
      this._subscription["classe"] = this.classeService.singleData$.subscribe(
        (classe) => {
          this.classe = classe;
        }
      );
    }
  }
}
