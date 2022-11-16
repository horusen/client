import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { FichierService } from "../fichier.service";

@Component({
  selector: "app-fichier-list",
  templateUrl: "./fichier-list.component.html",
  styleUrls: ["./fichier-list.component.scss"],
})
export class FichierListComponent extends BaseComponent implements OnInit {
  @Input() dossier: any;
  constructor(public fichierService: FichierService) {
    super(fichierService);
  }

  ngOnInit(): void {
    if (this.dossier) {
      this.getByDossier(this.dossier.id);
    } else {
      this.get();
    }
  }

  get() {
    this.loading = true;
    this.fichierService.initialise().subscribe(() => {
      this.loading = false;
    });
  }

  getByDossier(dossier: number) {
    this.loading = true;
    this.fichierService.getByDossier(dossier).subscribe(() => {
      this.loading = false;
    });
  }
}
