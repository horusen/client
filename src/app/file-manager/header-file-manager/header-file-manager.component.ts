import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";
import { FichierService } from "../fichier/fichier.service";
import { DossierService } from "../dossier/dossier.service";

@Component({
  selector: "app-header-file-manager",
  templateUrl: "./header-file-manager.component.html",
  styleUrls: ["./header-file-manager.component.scss"],
})
export class HeaderFileManagerComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public loadingSubscription: Subscription;
  constructor(
    public fichierService: FichierService,
    public helper: Helper,
    public dossierService: DossierService
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.fichierService.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  exporter() {
    this.fichierService.downloadSelectedFichiers();
  }

  ajouterDansDossier() {
    if (this.fichierService.selectedFichiers.length) {
      this.dossierService.fichiers = this.fichierService.selectedFichiers;
      this.helper.toggleModal("ajouter-fichier-dans-dossier-modal");
    }
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.fichierService.deleteSelectedFichiers();
    });
  }
}
