import { tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DossierService extends BaseService {
  private _fichier: any;
  private _fichiers: any[];
  fichier$ = new Subject<any>();
  fichiers$ = new Subject<any>();

  set fichier(fichier: any) {
    this._fichier = fichier;
    this.fichier$.next(this._fichier);
  }

  set fichiers(fichiers: any) {
    this._fichiers = fichiers;
    this.fichiers$.next(this._fichiers);
  }

  constructor() {
    super("dossier");
  }

  getDossiersNeContenantPasFichier(fichier: number) {
    return this.factory.get(`dossier/fichier/${fichier}/not`);
  }

  ajouterFichierDansDossier(elements: { fichier: number; dossier: number }) {
    return this.factory.post(`dossier/fichier`, elements);
  }

  deplacerFichierDansUnAutreDossier(
    fichier: number,
    dossier_origine: number,
    dossier_destination: number
  ) {
    return this.factory.post(`dossier/fichier/move`, {
      fichier,
      dossier_origine,
      dossier_destination,
    });
  }
}
