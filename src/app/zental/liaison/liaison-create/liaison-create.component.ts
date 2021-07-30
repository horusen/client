import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { BureauService } from "../../bureau/bureau.service";
import { MinistereService } from "../../ministere/ministere.service";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueCreateComponent } from "../../shared-zental/abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { LiaisonService } from "../liaison.service";

@Component({
  selector: "app-liaison-create",
  templateUrl: "./liaison-create.component.html",
  styleUrls: ["./liaison-create.component.scss"],
})
export class LiaisonCreateComponent
  extends EntiteDiplomatiqueCreateComponent
  implements OnInit
{
  ambassade: any;
  parent: string;
  dependancies = {
    ambassades: [],
    bureaux: [],
  };
  dependanciesLoading = {
    ambassades: false,
    bureaux: false,
  };
  constructor(
    public liaisonService: LiaisonService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    public bureauService: BureauService,
    public ambassadeService: AmbassadeService
  ) {
    super(
      liaisonService,
      ministereService,
      paysService,
      router,
      route,
      "liaison"
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.addControls(["ambassade", "bureau"], [null, null], [true, true]);
    if (this.router.url.includes("ministere")) {
      this.parent = "ministere";
      this._subscription["ministere2"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.getAmbassades(ministere.id);
          this.getBureauxByMinistere(ministere.id);
        });
    } else if (this.router.url.includes("ambassade")) {
      this.parent = "ambassade";
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.ambassade = ambassade;
          this.formValuePatcher("ambassade", [ambassade]);
          this.getBureauxByAmbassade(ambassade.id);
        });
    }
  }

  getAmbassades(ministere: number): void {
    this.dependanciesLoading.ambassades = true;
    this.ambassadeService
      .getByMinistere(ministere, {}, false)
      .subscribe((ambassades) => {
        this.dependancies.ambassades = ambassades;
        this.dependanciesLoading.ambassades = false;
      });
  }

  getBureauxByMinistere(ministere: number): void {
    this.dependanciesLoading.bureaux = true;
    this.bureauService
      .getByMinistere(ministere, {}, false)
      .subscribe((bureaux) => {
        this.dependancies.bureaux = bureaux;
        this.dependanciesLoading.bureaux = false;
      });
  }

  getBureauxByAmbassade(ambassade: number): void {
    this.dependanciesLoading.bureaux = true;
    this.bureauService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((bureaux) => {
        this.dependancies.bureaux = bureaux;
        this.dependanciesLoading.bureaux = false;
      });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
        ambassade: this.formValue("ambassade")[0].id,
        bureau: this.formValue("bureau")[0].id,
        ministere: this.parent === "ministere" ? this.ministere.id : null,
      };

      this.service.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.formValuePatcher("pays_origine", this.ministere.pays.id);
        this.parent === "ambassade"
          ? this.formValuePatcher("ambassade", [this.ambassade])
          : null;
        this.helper.toggleModal(`liaison-create-modal`);
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
