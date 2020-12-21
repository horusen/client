import { Component, Input, OnInit } from "@angular/core";
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
  @Input() elementAFiltrer: string;
  afficherFiltre: boolean = false;
  filtreActif: boolean = false; // Indique s'il y'a un ou des filtres actifs
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

    this.route.queryParams.subscribe((params) => {
      Object.keys(params).length
        ? (this.filtreActif = true)
        : (this.filtreActif = false);

      this.binderLesFitresExistants(params);
      console.log("hitted");
    });
  }

  binderLesFitresExistants(params: object) {
    // Domaines
    if (params.hasOwnProperty("domaines"))
      this.getDomaines(() => {
        this.valuePatcher("domaines", [
          this.helper.findValueInArrayByID(
            this.domaineService.data,
            params["domaines"]
          ),
        ]);
      });

    // niveau_difficultes
    if (params.hasOwnProperty("niveau_difficultes"))
      this.getNiveauDifficultes(() => {
        this.valuePatcher("niveau_difficultes", [
          this.helper.findValueInArrayByID(
            this.niveauDifficulteService.data,
            params["niveau_difficultes"]
          ),
        ]);
      });

    // niveaux
    if (params.hasOwnProperty("niveaux"))
      this.getNiveaux(() => {
        this.valuePatcher("niveaux", [
          this.helper.findValueInArrayByID(
            this.niveauService.data,
            params["niveaux"]
          ),
        ]);
      });

    // langues
    if (params.hasOwnProperty("langues"))
      this.getLangues(() => {
        this.valuePatcher("langues", [
          this.helper.findValueInArrayByID(
            this.langueService.data,
            params["langues"]
          ),
        ]);
      });

    // sous_domaines
    if (params.hasOwnProperty("sous_domaines"))
      this.getSousDomaines(() => {
        this.valuePatcher("sous_domaines", [
          this.helper.findValueInArrayByID(
            this.sousDomaineService.data,
            params["sous_domaines"]
          ),
        ]);
      });

    // mot_cles
    if (params.hasOwnProperty("mot_cles"))
      this.getSousDomaines(() => {
        this.valuePatcher("mot_cles", [
          this.helper.findValueInArrayByID(
            this.motCleService.data,
            params["mot_cles"]
          ),
        ]);
      });
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

  getDomaines(callback?: Function) {
    if (!this.dependancies.domaine.length) {
      this.loadingDepandacies.domaine = true;
      this.domaineService.get().subscribe((domaines) => {
        this.dependancies.domaine = domaines;
        this.loadingDepandacies.domaine = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  getNiveauDifficultes(callback?: Function) {
    if (!this.dependancies.niveau_difficulte.length) {
      this.loadingDepandacies.niveau_difficulte = true;
      this.niveauDifficulteService.get().subscribe((niveau_difficultes) => {
        this.dependancies.niveau_difficulte = niveau_difficultes;
        this.loadingDepandacies.niveau_difficulte = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  getMotCles(callback?: Function) {
    if (!this.dependancies.mot_cle.length) {
      this.loadingDepandacies.mot_cle = true;
      this.motCleService.get().subscribe((mot_cles) => {
        this.dependancies.mot_cle = mot_cles;
        this.loadingDepandacies.mot_cle = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  getSousDomaines(callback?: Function) {
    if (!this.dependancies.sous_domaine.length) {
      this.loadingDepandacies.sous_domaine = true;
      this.sousDomaineService.get().subscribe((sous_domaines) => {
        this.dependancies.sous_domaine = sous_domaines;
        this.loadingDepandacies.sous_domaine = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  getNiveaux(callback?: Function) {
    if (!this.dependancies.niveau.length) {
      this.loadingDepandacies.niveau = true;
      this.niveauService.get().subscribe((niveaux) => {
        this.dependancies.niveau = niveaux;
        this.loadingDepandacies.niveau = false;

        if (callback) {
          callback();
        }

        console.log(this.form.value);
      });
    }
  }

  getLangues(callback?: Function) {
    if (!this.dependancies.langue.length) {
      this.loadingDepandacies.langue = true;
      this.langueService.get().subscribe((langues) => {
        this.dependancies.langue = langues;
        this.loadingDepandacies.langue = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  private filtrer(element: string) {
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
    };

    this.router.navigate(["/school/" + element], {
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

  submit() {
    if (this.elementAFiltrer) this.filtrer(this.elementAFiltrer);
  }
}
