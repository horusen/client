import { Validators } from "@angular/forms";
import { ServiceEtablissementService } from "./../../etablissement/service-etablissement/service-etablissement.service";
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { FonctionService } from "../../fonction/fonction.service";
import { UserService } from "../../user/user.service";
import { EmployeCreateComponent } from "../employe-create/employe-create.component";
import { EmployeService } from "../employe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-employe-edit",
  templateUrl: "./emloye-edit.component.html",
  styleUrls: ["./emloye-edit.component.scss"],
})
export class EmloyeEditComponent
  extends EmployeCreateComponent
  implements OnInit {
  employe: any;

  constructor(
    public userService: UserService,
    public employeService: EmployeService,
    public fonctionService: FonctionService,
    public etablissementService: EtablissementService,
    public serviceEtablissementService: ServiceEtablissementService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      employeService,
      fonctionService,
      serviceEtablissementService,
      router,
      route
    );
  }

  ngOnInit(): void {
    this._subscription["single"] = this.employeService.singleData$.subscribe(
      (employe) => {
        this.employe = employe;
        this.initForm(this.employe);
        this.getDependancies(employe);
      }
    );

    // Disabled the user field
    this.dropdownSettingsAlt.user.disabled = true;
  }

  getDependancies(employe: any) {
    this.getFonctions();
    this.getServices(employe.etablissement);
  }

  initForm(employe: any) {
    this.form = this.fb.group({
      employe: [[employe.employe_details], Validators.required],
      fonctions: [employe.fonctions, Validators.required],
      service: [[employe.service], Validators.required],
      etablissement: [employe.etablissement, Validators.required],
    });
  }

  update() {
    this.loading = true;
    const data = {
      fonctions: this.helper.idExtractor(this.formValue("fonctions")),
      service: this.formValue("service")[0].id,
      employe: this.formValue("employe")[0].id,
      ...this.helper.omitFieldInObject(this.form.value, [
        "fonctions",
        "employe",
        "service",
      ]),
    };

    this.employeService.update(this.employe.id, data).subscribe(() => {
      this.loading = false;
      this.helper.alertSuccess();
      this.router.navigate(["./"], { relativeTo: this.route });
      this.helper.toggleModal("employe-edit-modal");
    });
  }
}
