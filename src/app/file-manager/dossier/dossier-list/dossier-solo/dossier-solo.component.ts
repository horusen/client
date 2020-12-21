import { DossierService } from "./../../dossier.service";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-dossier-solo",
  templateUrl: "./dossier-solo.component.html",
  styleUrls: ["./dossier-solo.component.scss"],
})
export class DossierSoloComponent implements OnInit {
  @Input() dossier: any;
  loading: boolean;
  displayFichier: boolean = false;
  constructor(public dossierService: DossierService, public helper: Helper) {}

  ngOnInit(): void {}

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.dossierService.delete(this.dossier.id).subscribe(() => {
        this.loading = false;
      });
    });
  }
}
