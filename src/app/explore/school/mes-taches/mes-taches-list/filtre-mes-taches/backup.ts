import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DomaineService } from "../../../domaine/domaine.service";
import { LangueService } from "../../../langue/langue.service";
import { MotCleService } from "../../../mot-cle/mot-cle.service";
import { NiveauDifficulteService } from "../../../niveau-difficulte/niveau-difficulte.service";
import { NiveauService } from "../../../niveau/niveau.service";
import { SousDomaineService } from "../../../sous-domaine/sous-domaine.service";
import { MesTachesService } from "../../mes-taches.service";

@Component({
  selector: "app-filtre-mes-taches",
  templateUrl: "./filtre-mes-taches.component.html",
  styleUrls: ["./filtre-mes-taches.component.scss"],
})
export class FiltreMesTachesComponent
  extends BaseCreateComponent
  implements OnInit {
  afficherFiltre: boolean = false;
  constructor(
    public mesTachesService: MesTachesService,
    private router: Router,
    public domaineService: DomaineService,
    public niveauService: NiveauService,
    public niveauDifficulteService: NiveauDifficulteService,
    public sousDomaineService: SousDomaineService,
    public langueService: LangueService,
    public motCleService: MotCleService,
    public route: ActivatedRoute
  ) {
    super(mesTachesService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();
  }

  // Stock les données recuilli grace aux dependances
  public dependancies = {
    domaine: [],
    sous_domaine: [],
    niveau: [],
    niveau_difficulte: [],
    mot_cle: [],
    langue: [],
    boolean: [true, false],
  };

  // local loading
  loadingDepandacies = {
    domaine: false,
    sous_domaine: false,
    niveau: false,
    niveau_difficulte: false,
    langue: false,
    mot_cle: false,
  };

  initialiseForm() {
    this.form = this.fb.group({
      domaines: [],
      niveaux: [],
      niveau_difficultes: [],
      langues: [],
      mot_cles: [],
      sous_domaines: [],
      by_user: [true, Validators.required],
    });
  }

  getDependancies() {
    if (!this.dependancies.domaine.length) {
      this.getDomaines();

      this.getSousDomaines();

      this.getNiveauDifficultes();

      this.getNiveaux();

      this.getLangues();

      this.getMotCles();
    }
  }

  getDomaines() {
    this.loadingDepandacies.domaine = true;
    this.domaineService.get().subscribe((domaines) => {
      this.dependancies.domaine = domaines;
      this.loadingDepandacies.domaine = false;
    });
  }

  getNiveauDifficultes() {
    this.loadingDepandacies.niveau_difficulte = true;
    this.niveauDifficulteService.get().subscribe((niveau_difficultes) => {
      this.dependancies.niveau_difficulte = niveau_difficultes;
      this.loadingDepandacies.niveau_difficulte = false;
    });
  }

  getMotCles() {
    this.loadingDepandacies.mot_cle = true;
    this.motCleService.get().subscribe((mot_cles) => {
      this.dependancies.mot_cle = mot_cles;
      this.loadingDepandacies.mot_cle = false;
    });
  }

  getSousDomaines() {
    this.loadingDepandacies.sous_domaine = true;
    this.sousDomaineService.get().subscribe((sous_domaines) => {
      this.dependancies.sous_domaine = sous_domaines;
      this.loadingDepandacies.sous_domaine = false;
    });
  }

  getNiveaux() {
    this.loadingDepandacies.niveau = true;
    this.niveauService.get().subscribe((niveaux) => {
      this.dependancies.niveau = niveaux;
      this.loadingDepandacies.niveau = false;
    });
  }

  getLangues() {
    this.loadingDepandacies.langue = true;
    this.langueService.get().subscribe((langues) => {
      this.dependancies.langue = langues;
      this.loadingDepandacies.langue = false;
    });
  }

  filtrer() {
    let data = {
      domaines: this.form.controls.domaines.value
        ? this.helper.idExtractor(this.form.controls.domaines.value)
        : null,
      sous_domaines: this.form.controls.sous_domaines.value
        ? this.helper.idExtractor(this.form.controls.sous_domaines.value)
        : null,
      niveaux: this.form.controls.niveaux.value
        ? this.helper.idExtractor(this.form.controls.niveaux.value)
        : null,
      langues: this.form.controls.langues.value
        ? this.helper.idExtractor(this.form.controls.langues.value)
        : null,
      mot_cles: this.form.controls.mot_cles.value
        ? this.helper.idExtractor(this.form.controls.mot_cles.value)
        : null,
      niveau_difficultes: this.form.controls.niveau_difficultes.value
        ? this.helper.idExtractor(this.form.controls.niveau_difficultes.value)
        : null,
      by_user: this.form.controls.by_user.value,
    };
    this.router.navigate(["/school/mes-taches"], {
      queryParams: this.helper.omitNullValueInObject(data),
    });
  }

  getUrlFromForm() {
    let url = "";
    Object.keys(this.helper.omitNullValueInObject(this.form.value)).forEach(
      (key) => {
        if (url) {
          url += "&";
        }

        url += `${key}=${
          this.form.controls[key].value[0]
            ? this.arrayUrlify(
                this.helper.idExtractor(this.form.controls[key].value)
              )
            : this.form.controls[key].value
        }`;
      }
    );

    return url;
  }

  arrayUrlify(array: any[]) {
    let url: string = "";
    array.forEach((item) => {
      if (url) {
        url += "+";
      }

      url += item;
    });

    return url;
  }
}
