import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DomaineService } from "src/app/zental/domaine/domaine.service";
import { FonctionService } from "src/app/zental/fonction/fonction.service";
import { PosteService } from "src/app/zental/poste/poste.service";

@Component({
  selector: "app-filtre-membre-cabinet-ministre",
  templateUrl: "./filtre-membre-cabinet-ministre.component.html",
  styleUrls: ["./filtre-membre-cabinet-ministre.component.scss"],
})
export class FiltreMembreCabinetMinistreComponent
  extends BaseCreateComponent
  implements OnInit
{
  dependancies = {
    domaines: [],
    postes: [],
    fonctions: [],
  };

  dependanciesLoading = {
    domaines: false,
    postes: false,
    fonctions: false,
  };
  constructor(
    public domaineService: DomaineService,
    public posteService: PosteService,
    public fonctionService: FonctionService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.initialiseForm();

    this.route.queryParams.subscribe((query) => {
      if (query.filter) {
        const filter = JSON.parse(query.filter);
        if (filter.domaines) {
          this.getDomaines(() => {
            const domaines = this.dependancies.domaines.filter((domaine) =>
              filter.domaines.includes(domaine.id)
            );

            this.formValuePatcher("domaines", domaines);
          });
        } else if (filter.postes) {
          this.getPostes(() => {
            const postes = this.dependancies.postes.filter((poste) =>
              filter.postes.includes(poste.id)
            );

            this.formValuePatcher("postes", postes);
          });
        } else if (filter.fonctions) {
          this.getFonctions(() => {
            const fonctions = this.dependancies.fonctions.filter((fonction) =>
              filter.fonctions.includes(fonction.id)
            );

            this.formValuePatcher("fonctions", fonctions);
          });
        }
      }
    });
  }

  getFonctions(callback?: Function): void {
    if (!this.dependancies.fonctions.length) {
      this.dependanciesLoading.fonctions = true;
      this.fonctionService.getAll(false).subscribe((fonctions) => {
        this.dependancies.fonctions = fonctions;
        this.dependanciesLoading.fonctions = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  getDomaines(callback?: Function): void {
    if (!this.dependancies.domaines.length) {
      this.dependanciesLoading.domaines = true;
      this.domaineService.getAll(false).subscribe((domaines) => {
        this.dependancies.domaines = domaines;
        this.dependanciesLoading.domaines = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  getPostes(callback?: Function): void {
    if (!this.dependancies.postes.length) {
      this.dependanciesLoading.postes = true;
      this.posteService.getAll(false).subscribe((postes) => {
        this.dependancies.postes = postes;
        this.dependanciesLoading.postes = false;

        if (callback) {
          callback();
        }
      });
    }
  }

  initialiseForm(): FormGroup {
    return this.fb.group({
      domaines: [[]],
      fonctions: [[]],
      postes: [[]],
    });
  }

  applyfilter() {
    let queryParams = {
      domaines: this.helper.idExtractor(this.form.controls.domaines.value),
      postes: this.helper.idExtractor(this.form.controls.postes.value),
      fonctions: this.helper.idExtractor(this.form.controls.fonctions.value),
    };

    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParams: {
        filter: JSON.stringify(this.helper.serializeObject(queryParams)),
      },
      queryParamsHandling: "merge",
      preserveFragment: true,
    });
  }
}
