import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "../identite.service";

@Component({
  selector: "app-civilite",
  templateUrl: "./civilite.component.html",
  styleUrls: ["./civilite.component.scss"],
})
export class CiviliteComponent extends BaseComponent implements OnInit {
  user: any;
  ajouter = false;
  typeMembreFamilleParams: string;

  constructor(public identiteSevice: IdentiteService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteSevice.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
      }
    );
  }

  ajouterMembreFamille(typeMembreFamille: any): void {
    this.ajouter = true;
    this.typeMembreFamilleParams = typeMembreFamille;
    this.helper.toggleModal("ajouter-membre-famille-modal");
  }

  // Se declanche quand le component ajouter-membre-famille fini d'ajouter un nouveau membre de famille
  onAjouterMembreFamille(): void {
    this.ajouter = false;
    this.typeMembreFamilleParams = null;
    this.helper.toggleModal("ajouter-membre-famille-modal");
  }
}
