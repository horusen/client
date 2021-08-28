import { Component, OnInit } from "@angular/core";
import { InscritptionConsulaireService } from "../../inscription-consulaire/inscritption-consulaire.service";
import { PieceConsulaireService } from "../piece-consulaire/piece-consulaire.service";

@Component({
  selector: "app-piece-consulaire-alt",
  templateUrl: "./piece-consulaire-alt.component.html",
  styleUrls: ["./piece-consulaire-alt.component.scss"],
})
export class PieceConsulaireAltComponent implements OnInit {
  inscriptionConsulaire: any;
  pieces = {
    passeport: null,
    justificatifResidence: null,
    visa: null,
  };

  piecesLoading = {
    passeport: false,
    justificatifResidence: false,
    visa: false,
  };

  constructor(
    public inscriptionConsulaireService: InscritptionConsulaireService,
    public pieceConsulaierService: PieceConsulaireService
  ) {}

  ngOnInit(): void {
    this.inscriptionConsulaireService.singleData$.subscribe((inscription) => {
      this.inscriptionConsulaire = inscription;
      this.pieces.justificatifResidence = inscription.justificatif_residence;
      this.getPasseport(inscription.user.id_inscription);
      this.getVisa(inscription.user.id_inscription);
    });
  }

  getPasseport(user: number): void {
    this.piecesLoading.passeport = true;
    this.pieceConsulaierService.getByUserAndType(user, 1).subscribe({
      next: (passeport) => {
        this.pieces.passeport = passeport;
        this.piecesLoading.passeport = false;
      },
    });
  }

  getVisa(user: number): void {
    this.piecesLoading.visa = true;
    this.pieceConsulaierService.getByUserAndType(user, 5).subscribe({
      next: (visa) => {
        this.pieces.visa = visa;
        this.piecesLoading.visa = false;
      },
    });
  }
}
