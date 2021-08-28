import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { LiaisonService } from "src/app/zental/liaison/liaison.service";
import { PasserelleService } from "src/app/zental/passerelle/passerelle.service";
import { BureauService } from "../../bureau.service";

@Component({
  selector: "app-affectation-bureau",
  templateUrl: "./affectation-bureau.component.html",
  styleUrls: ["./affectation-bureau.component.scss"],
})
export class AffectationBureauComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() bureau: any;
  dependancies = {
    affecter: ["LIAISON", "PASSERELLE"],
    liaisons: [],
    passerelles: [],
  };

  dependanciesLoading = false;

  constructor(
    public bureauService: BureauService,
    public liaisonService: LiaisonService,
    public passerelleService: PasserelleService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(bureauService);
  }

  ngOnInit(): void {
    this.initialiseForm(this.bureau);
  }

  initialiseForm(bureau?: any): void {
    let bureauValue: string;

    if (bureau.liaison) {
      bureauValue = "LIAISON";
    } else if (bureau.passerelle) {
      bureauValue = "PASSERELLE";
    } else {
      bureauValue = this.dependancies.affecter[0];
    }

    this.form = this.fb.group({
      affecter: [bureauValue, Validators.required], // Permet de sasvoir à quel objet on ajoute service
      liaison: [bureau.liaison ? [bureau.liaison] : null],
      passerelle: [bureau.passerelle ? [bureau.passerelle] : null],
      bureau: [this.bureau.id, Validators.required],
    });
  }

  getLiaisons(): void {
    if (this.bureau.ministere) {
      this._getLiaisonsByMinistere(this.bureau.ministere.id);
    } else if (this.bureau.ambassade) {
      this._getLiaisonsByAmbassade(this.bureau.ambassade.id);
    } else if (this.bureau.consulat) {
      this._getLiaisonsByConsulat(this.bureau.consulat.id);
    }
  }

  getPasserelles(): void {
    if (this.bureau.ministere) {
      this._getPasserellesByPays(
        this.bureau.ministere.entite_diplomatique.pays_origine.id
      );
    }
  }

  private _getLiaisonsByMinistere(ministere: number): void {
    if (!this.dependancies.liaisons.length) {
      this.dependanciesLoading = true;
      this.liaisonService
        .getNonAffecteByMinistere(ministere)
        .subscribe((liaisons) => {
          this.dependancies.liaisons = liaisons;
          this.dependanciesLoading = false;
        });
    }
  }

  private _getLiaisonsByAmbassade(ambassade: number): void {
    if (!this.dependancies.liaisons.length) {
      this.dependanciesLoading = true;
      this.liaisonService
        .getNonAffecteByAmbassade(ambassade)
        .subscribe((liaisons) => {
          this.dependancies.liaisons = liaisons;
          this.dependanciesLoading = false;
        });
    }
  }

  private _getLiaisonsByConsulat(consulat: number): void {
    if (!this.dependancies.liaisons.length) {
      this.dependanciesLoading = true;
      this.liaisonService
        .getNonAffecteByConsulat(consulat)
        .subscribe((liaisons) => {
          this.dependancies.liaisons = liaisons;
          this.dependanciesLoading = false;
        });
    }
  }

  private _getPasserellesByPays(pays: number): void {
    if (!this.dependancies.passerelles.length) {
      this.dependanciesLoading = true;
      this.passerelleService
        .getNonAffecteByPays(pays)
        .subscribe((passerelles) => {
          this.dependancies.passerelles = passerelles;
          this.dependanciesLoading = false;
        });
    }
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        liaison:
          this.formValue("affecter") === "LIAISON"
            ? this.formValue("liaison")[0].id
            : null,
        passerelle:
          this.formValue("affecter") === "PASSERELLE"
            ? this.formValue("passerelle")[0].id
            : null,
        bureau: this.formValue("bureau"),
        affecter: this.formValue("affecter"),
      };

      this.bureauService
        .affecter(this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.form.reset();
          this.helper.toggleModal(`affecter-bureau-modal`);
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
