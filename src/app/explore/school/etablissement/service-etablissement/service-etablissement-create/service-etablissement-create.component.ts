import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DomaineService } from "../../../domaine/domaine.service";
import { EtablissementService } from "../../etablissement.service";
import { ServiceEtablissementService } from "../service-etablissement.service";

@Component({
  selector: "app-service-etablissement-create",
  templateUrl: "./service-etablissement-create.component.html",
  styleUrls: ["./service-etablissement-create.component.scss"],
})
export class ServiceEtablissementCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  domaineLoading: boolean = false;
  domaines: [] = [];
  constructor(
    public serviceService: ServiceEtablissementService,
    public domaineService: DomaineService,
    public etablissementService: EtablissementService
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    this.initForm();
    this.getDomaines();

    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) =>
      this.formValuePatcher("etablissement", etablissement.id)
    );
  }

  initForm() {
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      description: [null, Validators.required],
      etablissement: [null, Validators.required],
      domaines: [[], Validators.required],
    });
  }

  getDomaines() {
    this.domaineLoading = true;
    this.domaineService.get(false).subscribe((domaines) => {
      this.domaines = domaines;
      this.domaineLoading = false;
    });
  }

  create() {
    this.loading = true;
    const data = {
      domaines: this.helper.idExtractor(this.formValue("domaines")),
      ...this.helper.omitFieldInObject(this.form.value, ["domaines"]),
    };

    this.serviceService.add(data).subscribe(() => {
      this.loading = false;
      this.helper.toggleModal("service-etablissement-create-modal");
      this.initForm();
    });
  }
}
