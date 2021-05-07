import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { FonctionService } from "../../fonction/fonction.service";
import { UserService } from "../../user/user.service";
import { EmployeService } from "../employe.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ServiceEtablissementService } from "../../etablissement/service-etablissement/service-etablissement.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-employe-create",
  templateUrl: "./employe-create.component.html",
  styleUrls: ["./employe-create.component.scss"],
})
export class EmployeCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  positionnement: string; // renseigne sur le component sur lequel on est positionné pour la création d'un employe (etablissement, ou service)

  dependancies = {
    fonction: [],
    services: [],
    user: [],
  };

  dependanciesLoading = {
    fonction: false,
    service: false,
    user: false,
  };
  constructor(
    public employeService: EmployeService,
    public fonctionService: FonctionService,
    public serviceEtablissementService: ServiceEtablissementService,
    public router: Router,
    public route: ActivatedRoute,
    public userService?: UserService,
    public etablissementService?: EtablissementService
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this.positionnement = this.router.url.includes("service")
      ? "service"
      : "etablissement";
    this.enableRetrieveSchema = false;
    super.ngOnInit();
    this.initForm();
    this.subscribeToDependancies();
    this.getDependancies();
  }

  initForm(employe?: any) {
    this.form = this.fb.group({
      employe: [null, Validators.required],
      fonctions: [null, Validators.required],
      service: [null, Validators.required],
      etablissement: [null, Validators.required],
    });

    this.form.controls.service.valueChanges.subscribe((service) => {
      this.getUsers(service[0].id);
    });
  }

  getDependancies(employe?: any) {
    this.getFonctions();
  }

  subscribeToDependancies() {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.formValuePatcher("etablissement", etablissement.id);
      if (this.positionnement === "etablissement") {
        this.getServices(etablissement.id);
      }
    });

    if (this.positionnement === "service") {
      this._subscription[
        "service"
      ] = this.etablissementService.singleData$.subscribe((service) => {
        this.formValuePatcher("service", [service]);
      });
    }
  }

  getFonctions() {
    this.dependanciesLoading.fonction = true;
    this.fonctionService.get(false).subscribe((fonctions) => {
      this.dependancies.fonction = fonctions;
      this.dependanciesLoading.fonction = false;
    });
  }

  getUsers(service: number) {
    this.dependanciesLoading.user = true;
    this.userService.getWhoNotEmployedInService(service).subscribe((users) => {
      this.dependancies.user = users;
      this.dependanciesLoading.user = false;
    });
  }

  getServices(etablissement: number) {
    this.dependanciesLoading.service = true;
    this.serviceEtablissementService
      .getByEtablissement(etablissement, false)
      .subscribe((services) => {
        this.dependancies.services = services;
        this.dependanciesLoading.service = false;
      });
  }

  onFonctionCreate(event) {
    this.dependancies.fonction.unshift(event.item);
  }

  create() {
    this.loading = true;
    const data = {
      fonctions: this.helper.idExtractor(this.formValue("fonctions")),
      service: this.formValue("service")[0].id,
      employe: this.formValue("employe")[0].id_inscription,
      ...this.helper.omitFieldInObject(this.form.value, [
        "fonctions",
        "employe",
        "service",
      ]),
    };

    this.employeService.add(data).subscribe(() => {
      this.loading = false;
      this.initForm();
      this.helper.alertSuccess();
      this.router.navigate(["./"], { relativeTo: this.route });
      this.helper.toggleModal("employe-create-modal");
    });
  }
}
