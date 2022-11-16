import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { UserService } from "src/app/zental/user/user.service";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { FonctionService } from "../../fonction/fonction.service";
import { MinistereService } from "../../ministere/ministere.service";
import { PosteService } from "../../poste/poste.service";
import { ServiceService } from "../../service/service.service";
import { MembreCabinetService } from "../membre-cabinet.service";

@Component({
  selector: "app-membre-cabinet-create",
  templateUrl: "./membre-cabinet-create.component.html",
  styleUrls: ["./membre-cabinet-create.component.scss"],
})
export class MembreCabinetCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  membre: any;

  dependancies = {
    users: [],
    postes: [],
    fonctions: [],
    services: [],
  };

  dependanciesLoading = {
    users: false,
    postes: false,
    fonctions: false,
    services: false,
  };

  constructor(
    public membreCabinetService: MembreCabinetService,
    public userService: UserService,
    public posteService: PosteService,
    public fonctionService: FonctionService,
    public serviceService: ServiceService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(membreCabinetService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDependancies();
  }

  initialiseForm(membreCabinet?: any): void {
    this.form = this.fb.group({
      membre: [
        membreCabinet ? [membreCabinet?.membre] : [],
        Validators.required,
      ],
      poste: [
        membreCabinet?.poste ? [membreCabinet?.poste] : [],
        Validators.required,
      ],
      fonction: [
        membreCabinet?.fonction ? [membreCabinet?.fonction] : [],
        Validators.required,
      ],
      service: [
        membreCabinet?.service ? [membreCabinet?.service] : [],
        Validators.required,
      ],
      note: [membreCabinet?.note],
      debut: [membreCabinet?.debut, Validators.required],
    });

    this.form.controls.service.valueChanges.subscribe((service) => {
      this.getUsers(service[0].id);
    });
  }

  getDependancies(): void {
    this.getFonctions();
    this.getPostes();
    this.getServices();
  }

  getServices() {
    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this._getServicesByMinistere(ministere.id);
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this._getServicesByAmbassade(ambassade.id);
        });
    } else if (this.router.url.includes("consulat")) {
      this._subscription["consulat"] =
        this.consulatService.singleData$.subscribe((consulat) => {
          this._getServicesByConsulat(consulat.id);
        });
    }
  }

  _getServicesByMinistere(ministere: number): void {
    this.dependanciesLoading.services = true;
    this.serviceService
      .getByMinistere(ministere, {}, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.services = false;
      });
  }

  _getServicesByAmbassade(ambassade: number): void {
    this.dependanciesLoading.services = true;
    this.serviceService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.services = false;
      });
  }

  _getServicesByConsulat(consulat: number): void {
    this.dependanciesLoading.services = true;
    this.serviceService
      .getByConsulat(consulat, {}, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.services = false;
      });
  }

  getFonctions(): void {
    this.dependanciesLoading.fonctions = true;
    this.fonctionService.getAll(false).subscribe((fonctions) => {
      this.dependancies.fonctions = fonctions;
      this.dependanciesLoading.fonctions = false;
    });
  }

  onFileChanged(event: any) {
    let fichier: File = event.target.files[0];
    console.log(fichier.type);
    if (fichier.type !== "application/pdf") {
      return this.helper.alertDanger("Format Invalide");
    }

    this.formData.append("fichier_joint", fichier);
  }

  getUsers(service: number): void {
    this.dependanciesLoading.users = true;
    this.userService.getNonEmployeDansService(service).subscribe((users) => {
      this.dependancies.users = users;
      this.dependanciesLoading.users = false;
    });
  }

  getPostes(): void {
    this.dependanciesLoading.postes = true;
    this.posteService.getAll(false).subscribe((postes) => {
      this.dependancies.postes = postes;
      this.dependanciesLoading.postes = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        poste: this.formValue("poste")[0]?.id,
        employe: this.formValue("membre")[0]?.id_inscription,
        fonction: this.formValue("fonction")[0]?.id,
        service: this.formValue("service")[0]?.id,
      });

      this.fillFormData(data);

      this.membreCabinetService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("membre-cabinet-create-modal");
        this.helper.alertSuccess();
        this.initialiseForm();
        this.formData = new FormData();

        // Remove selected membre from users who not members in the cabinet of ministre
        this.dependancies.users = this.dependancies.users.filter(
          (user) => user.id != data.membre
        );
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
