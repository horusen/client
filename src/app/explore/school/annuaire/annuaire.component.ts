import { ProfesseurService } from "./../professeur/professeur.service";
import { EleveService } from "./../eleve.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { EtablissementService } from "../etablissement/etablissement.service";
import { TypeEtablissementService } from "../etablissement/type-etablissement/type-etablissement.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { PaysService } from "../pays/pays.service";

@Component({
  selector: "app-annuaire",
  templateUrl: "./annuaire.component.html",
  styleUrls: ["./annuaire.component.scss"],
})
export class AnnuaireComponent extends BaseComponent implements OnInit {
  typeElementSelected: any;
  typeEtablissements: any[] = [];
  pays: any[] = [];
  loadingTypeEtablissement: boolean = false;
  loadingPays: boolean = false;
  constructor(
    public typeEtablissementService: TypeEtablissementService,
    public paysService: PaysService,
    public route: ActivatedRoute,
    public router: Router,
    public etablissementService: EtablissementService,
    public eleveService: EleveService,
    public professeurService: ProfesseurService
  ) {
    super(etablissementService)
  }

  ngOnInit(): void {
    this.getTypeEtablissements();
    this.getPays();

    // redirection par defaut vers etablissement
    this.route.queryParams.subscribe((params) => {
      if (!Object.keys(params)[0]) {
        this.router.navigate(["school/etablissement/annuaire/", "structure"], {
          queryParams: { "type-etablissement": 6, international: true },
        });
      }
    });

    // Initialisation du type element
    if (this.router.url.includes("eleve")) {
      this.typeElementSelected = "eleve";
    } else if (this.router.url.includes("professeur")) {
      this.typeElementSelected = "professeur";
    } else {
      this.typeElementSelected = "etablissement";
    }
  }

  getPays() {
    this.loadingPays = true;
    this.paysService.get().subscribe((pays) => {
      this.pays = pays;
      this.loadingPays = false;
    } )
  }

  research(keyword: string) {
    if (this.router.url.includes("eleve")) {
      this.getElevesInternationals(keyword);
    } else if (this.router.url.includes("professeur")) {
      this.getProfesseursInternationals(keyword);
    } else {
      this.getEtablissementsInternationalesByType(keyword);
    }
    // console.log(keyword);
    // this.typeElementSelected == "etablissement"
    //   ? this.getEtablissementsInternationalesByType(keyword)
    //   : null;

    // this.typeElementSelected == "professeur"
    //   ? this.getProfesseursInternationals(keyword)
    //   : null;

    // this.typeElementSelected == "eleve"
    //   ? this.getElevesInternationals(keyword)
    //   : null;
  }

  getTypeEtablissements() {
    this.loadingTypeEtablissement = true;
    this.typeEtablissementService
      .get()
      .subscribe((typeEtablissements: any[]) => {
        this.typeEtablissements = typeEtablissements.filter(
          (item) => item.id != 6
        );
        this.loadingTypeEtablissement = false;
      });
  }

  getProfesseursInternationals(keyword: string) {
    this.professeurService.loading = true;
    this.professeurService
      .getProfesseursInternationals(keyword)
      .subscribe(() => {
        this.professeurService.loading = false;
      });
  }

  getElevesInternationals(keyword: string) {
    this.eleveService.loading = true;
    this.eleveService.getElevesInternationals(keyword).subscribe(() => {
      this.eleveService.loading = false;
    });
  }

  getEtablissementsInternationalesByType(keyword: string = "") {
    this.etablissementService.loading = true;
    this.etablissementService
      .getEtablissementsInternationalesByType(
        this.etablissementService.typeEtablissement,
        keyword
      )
      .subscribe(() => {
        this.etablissementService.loading = false;
      });
  }

  navigate(event: any) {
    const url = event.target.value;
    const splittedUrl = url.split(",");

    const queryParams = splittedUrl[1]
      ? { international: true, "type-etablissement": splittedUrl[1] }
      : { international: true };

    this.router.navigate(["school/etablissement/annuaire/", splittedUrl[0]], {
      queryParams: queryParams,
    });
  }
}
