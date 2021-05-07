import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement.service";
import { ServiceEtablissementService } from "../service-etablissement.service";

@Component({
  selector: "app-service-etablissement-list",
  templateUrl: "./service-etablissement-list.component.html",
  styleUrls: ["./service-etablissement-list.component.scss"],
})
export class ServiceEtablissementListComponent
  extends BaseComponent
  implements OnInit {
  @Input() minified: boolean = false;
  constructor(
    public serviceService: ServiceEtablissementService,
    public etablissementService: EtablissementService
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getData(etablissement.id);
    });
  }

  getData(etablissement: number) {
    this.loading = true;
    this.serviceService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }

  modifier(service: any) {
    this.serviceService.singleData = service;
  }

  supprimer(service: any) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.serviceService.delete(service.id).subscribe(() => {
        this.helper.toastSuccess();
        this.loading = false;
      });
    });
  }
}
