import { Validators } from "@angular/forms";
import { BureauService } from "./../../bureau/bureau.service";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PasserelleService } from "../passerelle.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";

@Component({
  selector: "app-affecter-passerelle",
  templateUrl: "./affecter-passerelle.component.html",
  styleUrls: ["./affecter-passerelle.component.scss"],
})
export class AffecterPasserelleComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() passerelle: any;
  dependancieLoading = false;
  bureaux = [];
  constructor(
    public passerelleService: PasserelleService,
    public bureauxService: BureauService,
    public router: Router,
    public route: ActivatedRoute,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService
  ) {
    super(passerelleService);
  }

  ngOnInit(): void {
    this.initialiseForm(this.passerelle);
  }

  initialiseForm(passerelle: any): void {
    this.form = this.fb.group({
      passerelle: [passerelle.id, Validators.required],
      bureau: [
        passerelle.bureau ? [this.passerelle.bureau] : null,
        Validators.required,
      ],
    });
  }

  getBureaux(): void {
    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this._getBureauxByMinistere(ministere.id);
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this._getBureauxByAmbassade(ambassade.id);
        });
    } else if (this.router.url.includes("consulat")) {
      this._subscription["consulat"] =
        this.consulatService.singleData$.subscribe((consulat) => {
          this._getBureauxByConsulat(consulat.id);
        });
    }
  }

  private _getBureauxByMinistere(ministere: number): void {
    if (!this.bureaux.length) {
      this.dependancieLoading = true;
      this.bureauxService
        .getNonAffecteByMinistere(ministere)
        .subscribe((bureaux) => {
          this.bureaux = bureaux;
          this.dependancieLoading = false;
        });
    }
  }

  private _getBureauxByAmbassade(ambassade: number): void {
    if (!this.bureaux.length) {
      this.dependancieLoading = true;
      this.bureauxService
        .getNonAffecteByAmbassade(ambassade)
        .subscribe((bureaux) => {
          this.bureaux = bureaux;
          this.dependancieLoading = false;
        });
    }
  }

  private _getBureauxByConsulat(consulat: number): void {
    if (!this.bureaux.length) {
      this.dependancieLoading = true;
      this.bureauxService
        .getNonAffecteByConsulat(consulat)
        .subscribe((bureaux) => {
          this.bureaux = bureaux;
          this.dependancieLoading = false;
        });
    }
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        bureau: this.formValue("bureau")[0].id,
      };

      this.passerelleService
        .affecter(this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.initialiseForm(this.passerelle);
          this.helper.toggleModal(`affecter-passerelle-modal`);
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
