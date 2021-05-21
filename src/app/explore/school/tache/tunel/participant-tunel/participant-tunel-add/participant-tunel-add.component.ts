import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { TunelService } from "./../../tunel.service";
import { Component, OnInit } from "@angular/core";
import { MembreGroupeService } from "src/app/explore/school/groupe/groupe-show/membre-groupe/membre-groupe.service";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-participant-tunel-add",
  templateUrl: "./participant-tunel-add.component.html",
  styleUrls: ["./participant-tunel-add.component.scss"],
})
export class ParticipantTunelAddComponent
  extends BaseCreateComponent
  implements OnInit
{
  nonMembres: any[] = [];
  getNonMembreLoading: boolean = false;
  @Output() fermerAddComponent = new EventEmitter();
  constructor(
    public membreGroupeService: MembreGroupeService,
    public tunelService: TunelService
  ) {
    super(membreGroupeService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();

    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.getNonMembre(tunel.id_groupe);
        this.formValuePatcher("groupe", tunel.id_groupe);
      }
    );
  }

  initialiseForm() {
    this.form = this.fb.group({
      membres: [[], Validators.required],
      groupe: [null, Validators.required],
    });

    this.isFormOk = true;
  }

  closeAddComponent() {
    this.fermerAddComponent.emit();
  }

  ajouterMembre() {
    this.loading = true;
    const data = {
      membres: this.helper.idExtractor(
        this.formValue("membres"),
        "id_inscription"
      ),
      ...this.helper.omitFieldInObject(this.form.value, ["membres"]),
    };
    this.membreGroupeService.add(data).subscribe(() => {
      this.loading = false;
      this.initialiseForm();
      this.closeAddComponent();
    });
  }

  getNonMembre(groupe: number) {
    this.getNonMembreLoading = true;
    this.membreGroupeService
      .getNonMembreDansClasse(groupe)
      .subscribe((data) => {
        this.nonMembres = data;
        this.getNonMembreLoading = false;
      });
  }
}
