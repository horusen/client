import { BureauService } from "./../../bureau/bureau.service";
import { Validators } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { LiaisonService } from "../liaison.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { MinistereService } from "../../ministere/ministere.service";
import { AmbassadeService } from "../../ambassade/ambassade.service";

@Component({
  selector: "app-affecter-liaison",
  templateUrl: "./affecter-liaison.component.html",
  styleUrls: ["./affecter-liaison.component.scss"],
})
export class AffecterLiaisonComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() liaison: any;
  dependancieLoading = false;
  bureaux = [];
  constructor(
    public liaisonService: LiaisonService,
    public bureauxService: BureauService,
    public router: Router,
    public route: ActivatedRoute,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService
  ) {
    super(liaisonService);
  }

  ngOnInit(): void {
    this.initialiseForm(this.liaison);
  }

  initialiseForm(liaison: any): void {
    this.form = this.fb.group({
      liaison: [liaison.id, Validators.required],
      bureau: [
        liaison.bureau ? [this.liaison.bureau] : null,
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
        .getByMinistere(ministere, {}, false)
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
        .getByAmbassade(ambassade, {}, false)
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
        .getByConsulat(consulat, {}, false)
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

      this.liaisonService
        .affecter(this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.initialiseForm(this.liaison);
          this.helper.toggleModal(`affecter-liaison-modal`);
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
