import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PieceConsulaireService } from "../piece-consulaire.service";

@Component({
  selector: "app-piece-consulaire-edit",
  templateUrl: "./piece-consulaire-edit.component.html",
  styleUrls: ["./piece-consulaire-edit.component.scss"],
})
export class PieceConsulaireEditComponent
  extends BaseCreateComponent
  implements OnInit
{
  piece: any;
  constructor(public pieceConsulaireService: PieceConsulaireService) {
    super(pieceConsulaireService);
  }

  ngOnInit(): void {
    this._subscription["piece"] =
      this.pieceConsulaireService.singleData$.subscribe((piece) => {
        this.piece = piece;
        this.initialiseForm(piece);
      });
  }

  initialiseForm(piece: any): void {
    this.form = this.fb.group({
      debut: [piece.debut, Validators.required],
      fin: [piece.fin, Validators.required],
      note: [piece.note],
      fichier_joint: [piece.fichier_joint.name],
    });

    this.formValueComparer("debut", "fin", "lesDatesSontInvalides", true);

    this.isFormOk = true;
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      this.pieceConsulaireService
        .update(
          this.piece.id,
          this.helper.omitFieldInObject(this.form.value, ["fichier_joint"])
        )
        .subscribe(() => {
          this.loading = false;
          this.helper.hideModal("piece-consulaire-edit-modal");
          this.helper.alertSuccess();
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
