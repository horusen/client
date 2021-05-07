import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProfesseurService } from "../professeur.service";

@Component({
  selector: "app-professeur-list",
  templateUrl: "./professeur-list.component.html",
  styleUrls: ["./professeur-list.component.scss"],
})
export class ProfesseurListComponent extends BaseComponent implements OnInit {
  international: boolean = false;
  @Input() minified: boolean = false;
  adminRouteRegex = /school\/administration\/info\/[0-9]+\/details\/professeur/;
  constructor(
    public professeurService: ProfesseurService,
    public route?: ActivatedRoute,
    public router?: Router,
    public etablissementService?: EtablissementService,
    public classeService?: ClasseService
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams["filter"]) {
      this.getData(this.route.snapshot.queryParams["filter"]);
    } else {
      this.getData();
    }

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.filter) {
        this.getData(queryParams.filter);
      }
    });
  }

  getProfesseurInternationals(params?: Params) {
    this.international = true;
    this.loading = true;
    this.professeurService
      .getProfesseursInternationals(params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getData(params?: Params) {
    if (this.router.url.includes("school/tache")) {
      this.getByUserClasse();
    }
    // Liste des professeurs du même etablissement
    else if (this.router.url.match(/school\/professeur/)) {
      this.getProfesseursDeMemesEtablissements(params);
    }
    // etablissement show
    else if (this.router.url.includes("school/echo")) {
      this.getAll(params);
    }

    // Echo
    else if (this.router.url.includes("school/echo/professeur")) {
      this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id, params);
      });
    } else if (this.router.url.includes("school/echo/hierarchie-externe")) {
      this.getHorsEtablissementMemePays(
        this.etablissementService.etablissement.id
      );
    } else if (this.router.url.includes("school/echo/annuaire")) {
      this.getAll(params);
    }
    // Get by etablissement
    else if (
      this.router.url.match(/school\/administration\/[0-9]+\/professeur/) ||
      this.router.url.match(
        /school\/administration\/info\/[0-9]+\/details\/professeur/
      )
    ) {
      this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id, params);
      });
    }
    // Liste des professeurs par classe
    else if (this.router.url.match(/classe\/[0-9]+\/professeur/)) {
      this.classeService.singleData$.subscribe((etablissement) => {
        this.getByClasse(params);
      });
    }
  }

  getByClasse(params?: Params) {
    this.classeService.singleData$.subscribe((classe) => {
      this.loading = true;
      this.professeurService.getByClasse(classe.id, params).subscribe(() => {
        this.loading = false;
      });
    });
  }

  delete(professeur: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.professeurService.delete(professeur).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }

  getAll(params?: Params) {
    this.loading = true;
    this.professeurService.get(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getHorsEtablissementMemePays(etablissement: number, params?: Params) {
    this.loading = true;
    this.professeurService
      .getHorsEtablissementMemePays(etablissement, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByEtablissement(etablissement: number, params?: Params) {
    this.loading = true;
    this.professeurService
      .getByEtablissement(etablissement, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getProfesseursDeMemesEtablissements(params?: Params) {
    this.loading = true;
    this.professeurService
      .getProfesseursDeMemesEtablissements(params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByUserClasse(params?: Params) {
    this.loading = true;
    this.professeurService.getByUserClasse(params).subscribe(() => {
      this.loading = false;
    });
  }

  modifier(professeur: any) {
    this.professeurService.singleData = professeur;
  }
}
