import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";
import { DossierService } from "../../dossier/dossier.service";
import { FichierService } from "../fichier.service";
import { PasswordFichierService } from "../password-fichier/password-fichier.service";

@Component({
  selector: "app-fichier-solo",
  templateUrl: "./fichier-solo.component.html",
  styleUrls: ["./fichier-solo.component.scss"],
})
export class FichierSoloComponent implements OnInit {
  @Input() fichier: any;
  @Input() dossier: any;

  public loading: boolean = false;
  public checked: boolean = false;
  constructor(
    public fichierService: FichierService,
    public helper: Helper,
    public passwordSevice: PasswordFichierService,
    public dossierService: DossierService
  ) {}

  ngOnInit(): void {}

  download() {
    this.loading = true;
    this.fichierService.download(this.fichier.id).subscribe(() => {
      this.loading = false;
    });
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.fichierService.delete(this.fichier.id).subscribe(() => {
        this.helper.alertSuccess();
        this.loading = false;
      });
    });
  }

  supprimerDuDossier() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.fichierService
        .supprimerFichierDansDossier(this.dossier.id, this.fichier.id)
        .subscribe(() => {
          this.loading = false;
        });
    });
  }

  verifyIfChecked() {
    return this.fichierService.selectedFichiers
      .map((fichier) => fichier.id)
      .includes(this.fichier.id);
  }

  processPassword(typeProcess: string) {
    this.passwordSevice.processPassword(this.fichier, typeProcess);
  }

  onSelected(event: any) {
    if (event.target.checked) {
      this.fichierService.selectFichier(this.fichier);
    } else {
      this.fichierService.deselectFichier(this.fichier);
    }
  }

  ajouterFichierDansDossier() {
    this.dossierService.fichier = this.fichier;
    this.helper.toggleModal("ajouter-fichier-dans-dossier-modal");
  }
}
