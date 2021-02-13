import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { DomaineService } from "../../../domaine/domaine.service";
import { EtablissementService } from "../../etablissement.service";
import { ServiceEtablissementService } from "../service-etablissement.service";

@Component({
  selector: "app-service-etablissement-edit",
  templateUrl: "./service-etablissement-edit.component.html",
  styleUrls: ["./service-etablissement-edit.component.scss"],
})
export class ServiceEtablissementEditComponent
  extends BaseEditComponent
  implements OnInit {
  domaineLoading: boolean = false;
  domaines: [] = [];
  constructor(
    public serviceService: ServiceEtablissementService,
    public domaineService: DomaineService,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this._subscription["service"] = this.serviceService.singleData$.subscribe(
      (service) => {
        this.single = service;
        this.form = this.fb.group({
          libelle: [service.libelle, Validators.required],
          etablissement: [service.etablissement, Validators.required],
          description: [service.description, Validators.required],
          domaines: [service.domaines, Validators.required],
        });

        //
        this.getDomaines();
      }
    );
  }

  getDomaines() {
    this.domaineLoading = true;
    this.domaineService.get(false).subscribe((domaines) => {
      this.domaines = domaines;
      this.domaineLoading = false;
    });
  }

  edit() {
    this.loading = true;
    const data = {
      domaines: this.helper.idExtractor(this.formValue("domaines")),
      ...this.helper.omitFieldInObject(this.form.value, ["domaines"]),
    };

    this.serviceService.update(this.single.id, data).subscribe(() => {
      this.loading = false;
      this.helper.toggleModal("service-etablissement-edit-modal");
    });
  }
}
