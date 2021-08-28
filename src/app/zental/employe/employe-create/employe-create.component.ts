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

    console.log(this.form.value);

    this.getPostes();

    this.getFonctions();
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      affecter: [null, Validators.required], // Permet de sasvoir à quel objet on ajoute service
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
      charger_com: [false, Validators.required],
    });

    // Set and reset validators
    this.form.controls.affecter.valueChanges.subscribe((value) => {
      if (
        value === "AMBASSADE" ||
        value === "CONSULAT" ||
        value === "servicesInternes"
      ) {
        this._removeValidators();
        this.addValidators("service", [Validators.required]);
      } else if (value === "BUREAU") {
        this._removeValidators();
        this.addValidators("bureau", [Validators.required]);
      } else if (value === "LAISON") {
        this._removeValidators();
        this.addValidators("liaison", [Validators.required]);
      } else if (value === "PASSERELLE") {
        this._removeValidators();
        this.addValidators("passerelle", [Validators.required]);
      }
    });

    if (this.parent.name === "ministere") {
      this.formValuePatcher("affecter", this.dependancies.affecter[0]);
    } else if (this.parent.name === "ambassade") {
      // Remove unecessary element from dependancies affectation
      this.dependancies.affecter = this.dependancies.affecter.filter(
        (item) => item !== "PASSERELLE"
      );

      // Set a default value for ambassade field
      this.form.controls.affecter.valueChanges.subscribe({
        next: (value) => {
          if (value === "AMBASSADE") {
            this.formValuePatcher("ambassade", [this.parent.item]);
          }
        },
      });

      // SEt affecter field to "AMBASSADE" by default
      this.formValuePatcher("affecter", this.dependancies.affecter[0]);
    } else if (this.parent.name === "consulat") {
      // remove uncessary item in dependancies affecter
      this.dependancies.affecter = this.dependancies.affecter.filter(
        (item) => item !== "AMBASSADE" && item !== "PASSERELLE"
      );

      // Set a default value for consulat
      this.form.controls.affecter.valueChanges.subscribe({
        next: (value) => {
          if (value === "CONSULAT") {
            this.formValuePatcher("consulat", [this.parent.item]);
          }
        },
      });

      // Set affecter to "CONSULAT" by default
      this.formValuePatcher("affecter", "CONSULAT");
    } else if (this.parent.name === "bureau") {
      this.formValuePatcher("affecter", "BUREAU");
      this.formValuePatcher("bureau", [this.parent.item]);
    } else if (this.parent.name === "service") {
      this.formValuePatcher("affecter", "serviceInterne");
      this.formValuePatcher("service", [this.parent.item]);
    }
  }

  // Reset all validors from passerelle, bureaux, service, liaison
  private _removeValidators() {
    this.removeValidators("service");
    this.removeValidators("liaison");
    this.removeValidators("bureau");
    this.removeValidators("passerelle");
  }

  getServices(): void {
    if (this.parent.name === "ministere") {
      this._getServicesByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this._getServicesByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this._getServicesByConsulat(this.parent.item.id);
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
    this._getAmbassadeByMinistere(this.parent.item.id);
  }

  getLiaisons(): void {
    if (this.parent.name === "ministere") {
      this._getLiaisonsByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this._getLiaisonsByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this._getLiaisonsByConsulat(this.parent.item.id);
    }
  }

  getPasserelles(): void {
    this._getPasserellesByPays(this.parent.item.pays_origine.id);
  }

  getConsulats(): void {
    if (this.parent.name === "ministere") {
      this._getConsulatsByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this._getConsulatsByAmbassade(this.parent.item.id);
    }
  }

  getBureaux(): void {
    if (this.parent.name === "ministere") {
      this._getBureauxByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this._getBureauxByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this._getBureauxByConsulat(this.parent.item.id);
    }
  }

  getPostes(): void {
    if (this.parent.name === "ministere") {
      this._getPostesByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this._getPostesByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this._getPostesByConsulat(this.parent.item.id);
    } else if (this.parent.name === "bureau") {
      this._getPostesByBureau(this.parent.item.id);
    } else if (this.parent.name === "service") {
      this._getPostesByService(this.parent.item.id);
    }
  }

  getFonctions(): void {
    if (this.parent.name === "ministere") {
      this._getFonctionsByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this._getFonctionsByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this._getFonctionsByConsulat(this.parent.item.id);
    } else if (this.parent.name === "bureau") {
      this._getFonctionsByBureau(this.parent.item.id);
    } else if (this.parent.name === "service") {
      this._getFonctionsByService(this.parent.item.id);
    }
  }

  private _getPostesByMinistere(ministere: number): void {
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

  private _getPostesByService(service: number): void {
    if (!this.dependancies.postes.length) {
      this.dependanciesLoading.postes = true;
      this.posteService.getByService(service, {}, false).subscribe((postes) => {
        this.dependancies.postes = postes;
        this.dependanciesLoading.postes = false;
      });
    }
  }

  private _getFonctionsByService(service: number): void {
    if (!this.dependancies.fonctions.length) {
      this.dependanciesLoading.fonctions = true;
      this.fonctionService
        .getByService(service, {}, false)
        .subscribe((fonctions) => {
          this.dependancies.fonctions = fonctions;
          this.dependanciesLoading.fonctions = false;
        });
    }
  }

  private _getPostesByBureau(bureau: number): void {
    if (!this.dependancies.postes.length) {
      this.dependanciesLoading.postes = true;
      this.posteService.getByBureau(bureau, {}, false).subscribe((postes) => {
        this.dependancies.postes = postes;
        this.dependanciesLoading.postes = false;
      });
    }
  }

  private _getFonctionsByMinistere(ministere: number): void {
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

  private _getPostesByAmbassade(ambassade: number): void {
    if (!this.dependancies.postes.length) {
      this.dependanciesLoading.postes = true;
      this.posteService
        .getByAmbassade(ambassade, {}, false)
        .subscribe((postes) => {
          this.dependancies.postes = postes;
          this.dependanciesLoading.postes = false;
        });
    }
  }

  private _getFonctionsByAmbassade(ambassade: number): void {
    if (!this.dependancies.fonctions.length) {
      this.dependanciesLoading.fonctions = true;
      this.fonctionService
        .getByAmbassade(ambassade, {}, false)
        .subscribe((fonctions) => {
          this.dependancies.fonctions = fonctions;
          this.dependanciesLoading.fonctions = false;
        });
    }
  }

  private _getPostesByConsulat(consulat: number): void {
    if (!this.dependancies.postes.length) {
      this.dependanciesLoading.postes = true;
      this.posteService
        .getByConsulat(consulat, {}, false)
        .subscribe((postes) => {
          this.dependancies.postes = postes;
          this.dependanciesLoading.postes = false;
        });
    }
  }

  private _getFonctionsByBureau(bureau: number): void {
    if (!this.dependancies.fonctions.length) {
      this.dependanciesLoading.fonctions = true;
      this.fonctionService
        .getByBureau(bureau, {}, false)
        .subscribe((fonctions) => {
          this.dependancies.fonctions = fonctions;
          this.dependanciesLoading.fonctions = false;
        });
    }
  }

  private _getFonctionsByConsulat(consulat: number): void {
    if (!this.dependancies.fonctions.length) {
      this.dependanciesLoading.fonctions = true;
      this.fonctionService
        .getByConsulat(consulat, {}, false)
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

  private _getBureauxByAmbassade(ambassade: number): void {
    if (!this.dependancies.bureaux.length) {
      this.dependanciesLoading.bureaux = true;
      this.bureauService
        .getByAmbassade(ambassade, {}, false)
        .subscribe((bureaux) => {
          this.dependancies.bureaux = bureaux;
          this.dependanciesLoading.bureaux = false;
        });
    }
  }

  private _getBureauxByConsulat(consulat: number): void {
    if (!this.dependancies.bureaux.length) {
      this.dependanciesLoading.bureaux = true;
      this.bureauService
        .getByConsulat(consulat, {}, false)
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

  private _getConsulatsByAmbassade(ambassade: number): void {
    if (!this.dependancies.consulats.length) {
      this.dependanciesLoading.consulats = true;
      this.consulatService
        .getByAmbassade(ambassade, {}, false)
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

  private _getLiaisonsByAmbassade(ambassade: number): void {
    this.dependanciesLoading.liaisons = true;
    this.liaisonService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((liaisons) => {
        this.dependancies.liaisons = liaisons;
        this.dependanciesLoading.liaisons = false;
      });
  }

  private _getLiaisonsByConsulat(consulat: number): void {
    this.dependanciesLoading.liaisons = true;
    this.liaisonService
      .getByConsulat(consulat, {}, false)
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
      console.log(this.form.value);

      const data = {
        ...this.form.value,
        employe: this.formValue("employe")[0].id_inscription,
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

      console.log(data);

      this.fillFormData({
        ...this.helper.serializeObject(data),
        charger_com: this.formValue("charger_com"),
      });

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
