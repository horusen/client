import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { PieceConsulaireService } from "./piece-consulaire.service";
import { TypePieceConsulaireService } from "./type-piece-consulaire.service";

@Component({
  selector: "app-piece-consulaire",
  templateUrl: "./piece-consulaire.component.html",
  styleUrls: ["./piece-consulaire.component.scss"],
})
export class PieceConsulaireComponent extends BaseComponent implements OnInit {
  typesPiecesConsulaires = [];
  selectedTypePieceConsulaire: any;
  modalTitle: string;
  constructor(
    public typePieceConsulaireService: TypePieceConsulaireService,
    public pieceConsulaireService: PieceConsulaireService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTypesPiecesConsulaires();
  }

  getTypesPiecesConsulaires(): void {
    this.loading = true;
    this.typePieceConsulaireService.getAll(false).subscribe((types) => {
      this.typesPiecesConsulaires = types;
      this.loading = false;
    });
  }

  create(type: any): void {
    this.selectedTypePieceConsulaire = type;
    this.modalTitle = `ajouter${this.selectedTypePieceConsulaire.libelle.replace(
      /\s/g,
      ""
    )}`;
    this.helper.toggleModal("piece-consulaire-add-modal");
  }

  edit(type: any): void {
    this.modalTitle = `modifier${type.libelle.replace(/\s/g, "")}`;
    this.helper.toggleModal("piece-consulaire-edit-modal");
  }
}
