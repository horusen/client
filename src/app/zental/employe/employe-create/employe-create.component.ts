import { UserService } from "src/app/zental/user/user.service";
import { ServiceService } from "./../../service/service.service";
import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { EmployeService } from "../employe.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { BureauService } from "../../bureau/bureau.service";
import { PosteService } from "../../poste/poste.service";
import { FonctionService } from "../../fonction/fonction.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { PasserelleService } from "../../passerelle/passerelle.service";
import { LiaisonService } from "../../liaison/liaison.service";

@Component({
  selector: "app-employe-create",
  templateUrl: "./employe-create.component.html",
  styleUrls: ["./employe-create.component.scss"],
})
export class EmployeCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: { name: string; item: any };
  ministere: any;

  dependancies = {
    affecter: [
      "AMBASSADE",
      "CONSULAT",
      "LIAISON",
      "PASSERELLE",
      "serviceInterne",
      "BUREAU",
    ],
    ambassades: [],
    employes: [],
    bureaux: [],
    consulats: [],
    services: [],
    postes: [],
    fonctions: [],
    liaisons: [],
    passerelles: [],
  };

  dependanciesLoading = {
    ambassades: false,
    employes: false,
    bureaux: false,
    consulats: false,
    services: false,
    postes: false,
    fonctions: false,
    passerelles: false,
    liaisons: false,
  };

  constructor(
    public employeService: EmployeService,
    public ambassadeService: AmbassadeService,
    public serviceService: ServiceService,
    public consulatService: ConsulatService,
    public passerelleService: PasserelleService,
    public liaisonService: LiaisonService,
    public bureauService: BureauService,
    public ministereService: MinistereService,
    public posteService: PosteService,
    public fonctionService: FonctionService,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.ministere = ministere;
        this._getPostes(this.ministere.id);
        this._getFonctions(this.ministere.id);
      });
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      affecter: [this.dependancies.affecter[0], Validators.required], // Permet de sasvoir à quel objet on ajoute service
      employe: [null, Validators.required],
      fonction: [null, Validators.required],
      poste: [null, Validators.required],
      debut: [null, Validators.required],
      fin: [null],
      ambassade: [null],
      liaison: [null],
      passerelle: [null],
      consulat: [null],
      bureau: [null],
      service: [null],
      note: [null],
    });

    if (this.parent.name === "bureau") {
      this.formValuePatcher("affecter", "BUREAU");
      this.formValuePatcher("bureau", [this.parent.item]);
    } else if (this.parent.name === "service") {
      this.formValuePatcher("affecter", "serviceInterne");
      this.formValuePatcher("service", [this.parent.item]);
    }
  }

  getServices(): void {
    if (this.formValue("affecter") === "serviceInterne") {
      this._getServicesByMinistere(this.ministere.id);
    } else if (this.formValue("affecter") === "AMBASSADE") {
      this._getServicesByAmbassade(this.formValue("ambassade"));
    } else if (this.formValue("affecter") === "CONSULAT") {
      this._getServicesByConsulat(this.formValue("consulat"));
    }
  }

  getUsers(): void {
    if (!this.dependancies.employes.length) {
      this.dependanciesLoading.employes = true;
      this.userService.getAll().subscribe((employes) => {
        this.dependancies.employes = employes;
        this.dependanciesLoading.employes = false;
      });
    }
  }

  getAmbassades(): void {
    this._getAmbassadeByMinistere(this.ministere.id);
  }

  getLiaisons(): void {
    this._getLiaisonsByMinistere(this.ministere.id);
  }

  getPasserelles(): void {
    this._getPasserellesByPays(this.ministere.pays.id);
  }

  getConsulats(): void {
    this._getConsulatsByMinistere(this.ministere.id);
  }

  getBureaux(): void {
    this._getBureauxByMinistere(this.ministere.id);
  }

  resetSubscription(): void {
    Object.keys(this._subscription).forEach((key) => {
      if (["consulat", "ambassade"].includes(key)) {
        this._subscription[key].unsubscribe();
      }
    });
  }

  private _getPostes(ministere: number): void {
    if (!this.dependancies.postes.length) {
      this.dependanciesLoading.postes = true;
      this.posteService
        .getByMinistere(ministere, {}, false)
        .subscribe((postes) => {
          this.dependancies.postes = postes;
          this.dependanciesLoading.postes = false;
        });
    }
  }

  private _getFonctions(ministere: number): void {
    if (!this.dependancies.fonctions.length) {
      this.dependanciesLoading.fonctions = true;
      this.fonctionService
        .getByMinistere(ministere, {}, false)
        .subscribe((fonctions) => {
          this.dependancies.fonctions = fonctions;
          this.dependanciesLoading.fonctions = false;
        });
    }
  }

  private _getAmbassadeByMinistere(ministere: number): void {
    if (!this.dependancies.ambassades.length) {
      this.dependanciesLoading.ambassades = true;
      this.ambassadeService
        .getByMinistere(ministere, {}, false)
        .subscribe((ambassades) => {
          this.dependancies.ambassades = ambassades;
          this.dependanciesLoading.ambassades = false;
        });
    }
  }

  private _getBureauxByMinistere(ministere: number): void {
    if (!this.dependancies.bureaux.length) {
      this.dependanciesLoading.bureaux = true;
      this.bureauService
        .getByMinistere(ministere, {}, false)
        .subscribe((bureaux) => {
          this.dependancies.bureaux = bureaux;
          this.dependanciesLoading.bureaux = false;
        });
    }
  }

  private _getConsulatsByMinistere(ministere: number): void {
    if (!this.dependancies.consulats.length) {
      this.dependanciesLoading.consulats = true;
      this.consulatService
        .getByMinistere(ministere, {}, false)
        .subscribe((consulats) => {
          this.dependancies.consulats = consulats;
          this.dependanciesLoading.consulats = false;
        });
    }
  }

  private _getServicesByMinistere(ministere: number): void {
    this.dependanciesLoading.services = true;
    this.serviceService
      .getByMinistere(ministere, {}, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.services = false;
      });
  }

  private _getLiaisonsByMinistere(ministere: number): void {
    this.dependanciesLoading.liaisons = true;
    this.liaisonService
      .getByMinistere(ministere, {}, false)
      .subscribe((liaisons) => {
        this.dependancies.liaisons = liaisons;
        this.dependanciesLoading.liaisons = false;
      });
  }

  private _getPasserellesByPays(pays: number): void {
    this.dependanciesLoading.passerelles = true;
    this.passerelleService
      .getByPays(pays, {}, false)
      .subscribe((passerelles) => {
        this.dependancies.passerelles = passerelles;
        this.dependanciesLoading.passerelles = false;
      });
  }

  private _getServicesByAmbassade(ambassade: number): void {
    this.dependanciesLoading.services = true;
    this.serviceService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.services = false;
      });
  }

  private _getServicesByConsulat(consulat: number): void {
    this.dependanciesLoading.services = true;
    this.serviceService
      .getByConsulat(consulat, {}, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.services = false;
      });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        employe: this.formValue("employe")[0].id_inscription,
        debut: this.formValue("debut"),
        fin: this.formValue("fin"),
        fonction: this.formValue("fonction")[0].id,
        poste: this.formValue("poste")[0].id,
        liaison:
          this.formValue("affecter") === "LIAISON"
            ? this.formValue("liaison")[0].id
            : null,
        passerelle:
          this.formValue("affecter") === "PASSERELLE"
            ? this.formValue("passerelle")[0].id
            : null,
        bureau:
          this.formValue("affecter") === "BUREAU"
            ? this.formValue("bureau")[0].id
            : null,
        service: ["serviceInterne", "CONSULAT", "AMBASSADE"].includes(
          this.formValue("affecter")
        )
          ? this.formValue("service")[0].id
          : null,
      };

      this.fillFormData(this.helper.serializeObject(data));

      this.employeService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.alertSuccess();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
