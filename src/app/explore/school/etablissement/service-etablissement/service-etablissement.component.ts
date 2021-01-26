import { Helper } from "src/app/shared/services/helper";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../etablissement.service";

@Component({
  selector: "app-service-etablissement",
  templateUrl: "./service-etablissement.component.html",
  styleUrls: ["./service-etablissement.component.scss"],
})
export class ServiceEtablissementComponent implements OnInit {
  etablissement: any;
  etablissementSubscription: Subscription;
  onCreateService: boolean = false;
  constructor(
    public etablissementService: EtablissementService,
    public serviceEtablissementService: EtablissementService,
    public helper: Helper
  ) {}

  ngOnInit(): void {
    this.etablissementSubscription = this.etablissementService.singleData$.subscribe(
      (etablissement) => {
        this.etablissement = etablissement;
      }
    );
  }

  createService() {
    this.onCreateService = true;
    this.helper.toggleModal("service-etablissement-create-modal");
  }

  addService([name, item]) {
    this.serviceEtablissementService.unshiftItemInData(item);
  }
}
