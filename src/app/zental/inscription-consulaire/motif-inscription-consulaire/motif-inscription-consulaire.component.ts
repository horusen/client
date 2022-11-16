import { Validators } from "@angular/forms";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { InscritptionConsulaireService } from "../inscritption-consulaire.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-motif-inscription-consulaire",
  templateUrl: "./motif-inscription-consulaire.component.html",
  styleUrls: ["./motif-inscription-consulaire.component.scss"],
})
export class MotifInscriptionConsulaireComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() user: number;
  @Input() inscriptionConsulaire: number;
  @Input() etatInscriptionConsulaire: number;
  @Output() done = new EventEmitter();
  constructor(
    public inscriptionConsulaireService: InscritptionConsulaireService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      inscription_consulaire: [
        this.inscriptionConsulaire,
        this.inscriptionConsulaire && !this.user ? Validators.required : null,
      ],
      user: [
        this.user,
        !this.inscriptionConsulaire && this.user ? Validators.required : null,
      ],
      etat: [this.etatInscriptionConsulaire, Validators.required],
      motif: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      this.inscriptionConsulaireService
        .changerEtat(this.helper.serializeObject(this.form.value))
        .subscribe(() => {
          this.loading = false;
          if (this.inscriptionConsulaireService.singleData) {
            this.inscriptionConsulaireService.singleData = null;
            this.router.navigate([".."], {
              relativeTo: this.route,
              queryParamsHandling: "preserve",
            });
          }
          this.helper.toggleModal("motif-inscription-consulaire-modal");
          this.helper.alertSuccess();
          this.done.emit();
        });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
