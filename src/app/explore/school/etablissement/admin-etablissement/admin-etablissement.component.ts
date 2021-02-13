import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-admin-etablissement",
  templateUrl: "./admin-etablissement.component.html",
  styleUrls: ["./admin-etablissement.component.scss"],
})
export class AdminEtablissementComponent implements OnInit {
  addAdminEtablissement: boolean = false; // Permet de n'activer le component "admin-etablissement-add" qu'au besoion
  addChargerComEtablissement: boolean = false; // Permet de n'activer le component "charger-communication-etablissement-add" qu'au besoion
  constructor(public helper: Helper) {}

  ngOnInit(): void {}

  ajouterAdminEtablissement() {
    this.addAdminEtablissement = true;
    this.helper.toggleModal("admin-etablissement-add-modal");
  }

  ajouterChargerComEtablissement() {
    this.addChargerComEtablissement = true;
    this.helper.toggleModal("charger-com-etablissement-add-modal");
  }
}
