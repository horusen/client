import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class FichierService extends BaseService {
  selectedFichiers: any[] = [];
  constructor() {
    super("fichier");
  }

  download(fichier: number) {
    return this.factory.get(`download/${fichier}`);
  }

  getByDiscussion(discussion: number, params?: Params) {
    return this.factory
      .get(`discussion/${discussion}/fichier`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByTunel(tunel: number, params?: Params) {
    return this.factory
      .get(`tunel/${tunel}/fichier`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  selectFichier(fichier: any) {
    this.selectedFichiers.push(fichier);
  }

  deselectFichier(fichier: any) {
    this.selectedFichiers = this.selectedFichiers.filter(
      (fichierp) => fichierp.id != fichier.id
    );
  }

  // Supprime de façon recursive les fichiers selectionée un à un
  deleteSelectedFichiers() {
    if (this.selectedFichiers.length) {
      this.loading$.next(true);
      this.delete(this.selectedFichiers[0].id).subscribe(() => {
        this.deselectFichier(this.selectedFichiers[0]);
        this.deleteSelectedFichiers();
      });
    } else {
      this.loading$.next(false);
    }
  }

  // telechargem de façon recursive les fichiers selectionée un à un
  downloadSelectedFichiers() {
    if (this.selectedFichiers.length) {
      this.loading$.next(true);
      this.download(this.selectedFichiers[0].id).subscribe(
        () => {},
        () => {
          this.deselectFichier(this.selectedFichiers[0]);
          this.downloadSelectedFichiers();
        }
      );
    } else {
      this.loading$.next(false);
    }
  }

  ajouterFichierDansDossier(elements: { dossier: number; fichier: number }) {
    return this.factory.post(`dossier/fichier`, elements);
  }

  getByDossier(dossier: number) {
    return this.factory
      .get(`dossier/${dossier}/fichier`)
      .pipe(tap(this.listResponseHandler()));
  }

  supprimerFichierDansDossier(dossier: number, fichier: number) {
    return this.factory.delete(`dossier/${dossier}/fichier/${fichier}`).pipe(
      tap({
        next: () => {
          this.deleteItemInData(fichier);
        },
      })
    );
  }
}
