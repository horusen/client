import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    this._subscription["loading"] = this.professeurService.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    );

    if (this.router.url.includes("school/explore")) {
      this.getByUserClasse();
    } else if (this.router.url.includes("school/professeur")) {
      this.getAutresDeMemeEtablissement();
    } else if (
      this.router.url.includes("school/etablissement/hierarchie-interne")
    ) {
      this.getByEtablissement(this.etablissementService.etablissement.id);
    } else if (
      this.router.url.includes("school/etablissement/hierarchie-externe")
    ) {
      this.getHorsEtablissementMemePays(
        this.etablissementService.etablissement.id
      );
    } else if (this.router.url.includes("school/etablissement/annuaire")) {
      this.getAll();
    } else if (
      this.router.url.includes("school/etablissement") && /\d/.test(this.router.url) 
    ) {
      this.etablissementService.singleData$.subscribe((etablissement) => {
        console.log("etablissement");
        this.getByEtablissement(etablissement.id);
      });
  } else if (this.router.url.includes("school/etablissement/class")) {
    this.getByClasse();
  }
    // this.route.queryParams.subscribe((params) => {
    //   if (params["international"] == "true") {
    //     this.getProfesseurInternationals();
    //   } else if (params["by"] && params["by"] == "user-class") {
    //   }
    // });
  }

  getProfesseurInternationals(keyword: string = "") {
    this.international = true;
    this.loading = true;
    this.professeurService
      .getProfesseursInternationals(keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByClasse(keyword: string = "") {
    this.classeService.singleData$.subscribe(classe => {
      this.loading = true;
      this.professeurService.getByClasse(classe.id, keyword).subscribe(() => {
        this.loading = false;
      })
    })
  }

  getAll(keyword: string = "") {
    this.loading = true;
    this.professeurService.get(keyword).subscribe(() => {
      this.loading = false;
    });
  }

  getHorsEtablissementMemePays(etablissement: number, keyword: string = "") {
    this.loading = true;
    this.professeurService
      .getHorsEtablissementMemePays(etablissement, keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByEtablissement(etablissement: number, keyword: string = "") {
    this.loading = true;
    this.professeurService
      .getByEtablissement(etablissement, keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getAutresDeMemeEtablissement(keyword: string = "") {
    this.loading = true;
    this.professeurService
      .getAutresDeMemesEtablissements(keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }
  getByUserClasse(keyword: string = "") {
    this.loading = true;
    this.professeurService.getByUserClasse(keyword).subscribe(() => {
      this.loading = false;
    });
  }
}
