import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DossierService } from "../dossier.service";

@Component({
  selector: "app-dossier-list-min",
  templateUrl: "./dossier-list-min.component.html",
  styleUrls: ["./dossier-list-min.component.scss"],
})
export class DossierListMinComponent extends BaseComponent implements OnInit {
  fichier: any;
  fichiers: any[] = [];
  constructor(public dossierService: DossierService) {
    super(dossierService);
  }

  ngOnInit(): void {
    this._subscription["fichier"] = this.dossierService.fichier$.subscribe(
      (fichier) => {
        this.fichier = fichier;
        this.getData(this.fichier.id);
      }
    );

    this._subscription["fichiers"] = this.dossierService.fichiers$.subscribe(
      (fichiers) => {
        this.fichiers = fichiers;
        this.initialise();
      }
    );
  }

  getData(fichier: number) {
    this.loading = true;
    this.dossierService
      .getDossiersNeContenantPasFichier(fichier)
      .subscribe((dossiers) => {
        this.data = dossiers;
        this.loading = false;
      });
  }

  initialise() {
    this.loading = true;
    this.dossierService.initialise().subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }

  onDossierCreate(dossier: any) {
    this.data.unshift(dossier.item);
  }

  ajouterFichierDansDossier(dossier: number) {
    if (this.fichiers.length && !this.fichier) {
      this.ajouterFichiers(dossier);
    } else if (!this.fichier.length && this.fichier) {
      this.ajouterFichier(dossier);
    }
  }

  ajouterFichier(dossier: number) {
    this.loading = true;
    this.dossierService
      .ajouterFichierDansDossier({ dossier, fichier: this.fichier.id })
      .subscribe(() => {
        this.helper.toggleModal("ajouter-fichier-dans-dossier-modal");
        this.fichier = null;
        this.loading = false;
      });
  }

  ajouterFichiers(dossier: number) {
    if (this.fichiers.length) {
      this.loading = true;
      this.dossierService
        .ajouterFichierDansDossier({ dossier, fichier: this.fichiers[0].id })
        .subscribe(() => {
          this.fichiers.shift();
          this.ajouterFichiers(dossier);
        });
    } else {
      this.helper.toggleModal("ajouter-fichier-dans-dossier-modal");
      this.fichier = null;
      this.loading = false;
    }
  }
}
