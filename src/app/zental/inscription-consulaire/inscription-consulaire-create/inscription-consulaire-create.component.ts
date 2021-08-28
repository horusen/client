import { LiaisonService } from "./../../liaison/liaison.service";
import { ConsulatService } from "./../../consulat/consulat.service";
import { AmbassadeService } from "./../../ambassade/ambassade.service";
import { Validators } from "@angular/forms";
import { InscritptionConsulaireService } from "./../inscritption-consulaire.service";
import { Component, Input, OnInit } from "@angular/core";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";

@Component({
  selector: "app-inscription-consulaire-create",
  templateUrl: "./inscription-consulaire-create.component.html",
  styleUrls: ["./inscription-consulaire-create.component.scss"],
})
export class InscriptionConsulaireCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  file: File;
  constructor(
    public inscriptionConsulaireService: InscritptionConsulaireService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public liaisonService: LiaisonService
  ) {
    super(inscriptionConsulaireService);
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      [this.parent.name]: [this.parent.item.id, Validators.required],
      user: [this.auth.user.id_inscription, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  onFileChanged(event: any) {
    let fichier: File = event.target.files[0];
    if (fichier.type !== "application/pdf") {
      return this.helper.alertDanger("Format Invalide");
    }

    this.file = fichier;
    this.formData.append("justificatif_residence", fichier);
  }

  create(): void {
    if (
      this.form.valid &&
      this.formData.has("justificatif_residence") &&
      this.formData.get("justificatif_residence") instanceof File
    ) {
      this.loading = true;
      this.fillFormData(this.form.value);
      this.inscriptionConsulaireService.add(this.formData).subscribe({
        next: () => {
          if (this.parent.name === "ambassade") {
            this.ambassadeService.singleData.user_inscription_consulaire = 1;
          } else if (this.parent.name === "consulat") {
            this.consulatService.singleData.user_inscription_consulaire = 1;
          } else if (this.parent.name === "liaison") {
            this.liaisonService.singleData.user_inscription_consulaire = 1;
          }
        },
        error: (error) => {
          this.helper.alertDanger(error.error.error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.formData = new FormData();
          this.helper.toggleModal("inscription-consulaire-modal");
          this.helper.alertSuccess();
        },
      });
    }
  }
}
