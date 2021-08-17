import { IdentiteService } from "./../../identite.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { PieceConsulaireService } from "../piece-consulaire.service";

@Component({
  selector: "app-piece-consulaire-solo",
  templateUrl: "./piece-consulaire-solo.component.html",
  styleUrls: ["./piece-consulaire-solo.component.scss"],
})
export class PieceConsulaireSoloComponent
  extends BaseComponent
  implements OnInit
{
  @Input() type: any;
  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter();
  pieceConsulaire: any;
  user: any;
  constructor(
    public pieceConsulaireService: PieceConsulaireService,
    public identiteService: IdentiteService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["user"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
        this.getData(user.id_inscription, this.type.id);
      }
    );

    this._subscription["newPiece"] =
      this.pieceConsulaireService.lastItemcreated$.subscribe((piece) => {
        if (piece.type === this.type.id) {
          this.pieceConsulaire = piece;
        }
      });
  }

  getData(user: number, type: number): void {
    this.loading = true;
    this.pieceConsulaireService
      .getByUserAndType(user, type)
      .subscribe((piece) => {
        this.pieceConsulaire = piece;
        this.loading = false;
      });
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.pieceConsulaireService
        .delete(this.pieceConsulaire.id)
        .subscribe(() => {
          this.pieceConsulaire = null;
          this.loading = false;
        });
    });
  }

  add(): void {
    this.create.emit();
  }

  modifier(): void {
    this.pieceConsulaireService.singleData = this.pieceConsulaire;
    this.edit.emit();
  }
}
