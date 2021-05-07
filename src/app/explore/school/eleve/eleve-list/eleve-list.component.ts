import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { EleveService } from "../../eleve.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProfesseurService } from "../../professeur/professeur.service";

@Component({
  selector: "app-eleve-list",
  templateUrl: "./eleve-list.component.html",
  styleUrls: ["./eleve-list.component.scss"],
})
export class EleveListComponent extends BaseComponent implements OnInit {
  international: boolean = false;
  @Input() minified: boolean = false;

  // Regex qui permet de matcher les routes pourla recuperations des données
  path = {
    admistration_etablissement: /.school\/administration\/[0-9]+\/eleve/,
    etablissement: /.school\/echo\/type\/[0-9]+\etablissement\/[0-9]+\/eleve/,
    classe: /.classe\/[0-9]+\/eleve/,
    professeur: /.professeur\/eleves/,
  };
  constructor(
    public eleveService: EleveService,
    public classeService: ClasseService,
    public etablissementService: EtablissementService,
    public professeurService: ProfesseurService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params) {
    // ECHO
    if (this.router.url.includes("school/echo/eleves")) {
      this.getAll(params);
    }
    // Administration etablissement
    else if (
      this.router.url.includes("school/administration") ||
      this.router.url.match("school/echo")
    ) {
      this._subscription[
        "etablissement"
      ] = this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id, params);
      });
    }
    // Classe: get by classe
    else if (this.router.url.match(this.path.classe)) {
      this._subscription["classe"] = this.classeService.singleData$.subscribe(
        (classe) => {
          this.getByClasse(classe.id, params);
        }
      );
    }
    // Professeur: get by professeur
    else if (this.router.url.match(this.path.professeur)) {
      this._subscription[
        "professeur"
      ] = this.professeurService.singleData$.subscribe((professeur) => {
        this.getByProfesseur(professeur.id, params);
      });
    }
  }

  getByEtablissement(etablissement: number, params?: Params) {
    this.loading = true;
    this.eleveService
      .getByEtablissement(etablissement, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByProfesseur(professeur: number, params?: Params) {
    this.loading = true;
    this.eleveService.getByProfesseur(professeur, params).subscribe(() => {
      this.loading = false;
    });
  }

  getEleveInternationals() {
    this.international = true;
    this.loading = true;
    this.eleveService.getElevesInternationals().subscribe(() => {
      this.loading = false;
    });
  }

  getAll(params: any) {
    this.loading = true;
    this.eleveService.get(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByClasse(classe: number, params?: Params) {
    this.loading = true;
    this.eleveService.getByClasse(classe, params).subscribe(() => {
      this.loading = false;
    });
  }
}
