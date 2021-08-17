import { Validators } from "@angular/forms";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { IdentiteService } from "../../identite.service";
import { PieceConsulaireService } from "../piece-consulaire.service";

@Component({
  selector: "app-piece-consulaire-create",
  templateUrl: "./piece-consulaire-create.component.html",
  styleUrls: ["./piece-consulaire-create.component.scss"],
})
export class PieceConsulaireCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  user: any;
  @Input() type: any;
  @Output() done = new EventEmitter();
  constructor(
    public identiteService: IdentiteService,
    public pieceConsulaireService: PieceConsulaireService
  ) {
    super(pieceConsulaireService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
        this.initialiseForm();
      }
    );
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      user: [this.user.id_inscription, Validators.required],
      type: [this.type.id, Validators.required],
      debut: ["", Validators.required],
      fin: ["", Validators.required],
      note: [""],
      fichier_joint: ["", Validators.required],
    });

    this.formValueComparer("debut", "fin", "lesDatesSontInvalides", true);

    this.isFormOk = true;
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      this.fillFormData(
        this.helper.omitFieldInObject(this.form.value, ["fichier_joint"])
      );
      this.pieceConsulaireService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.helper.hideModal("piece-consulaire-add-modal");
        this.helper.alertSuccess();
        this.initialiseForm();
        this.formData = new FormData();
        this.done.emit();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
