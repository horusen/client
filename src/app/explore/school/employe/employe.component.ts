import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceEtablissementService } from "../etablissement/service-etablissement/service-etablissement.service";
import { EtablissementService } from "../etablissement/etablissement.service";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-employe",
  templateUrl: "./employe.component.html",
  styleUrls: ["./employe.component.scss"],
})
export class EmployeComponent implements OnInit, OnDestroy {
  previousUrl: string;
  service: any;
  etablissement: any;
  serviceSubscription: Subscription;
  etablissementSubscription: Subscription;
  onAddEmploye: boolean = false;
  constructor(
    public router: Router,
    public serviceEtablissementService: ServiceEtablissementService,
    public etablissementService: EtablissementService,
    public helper: Helper
  ) {}

  ngOnInit(): void {
    this.serviceSubscription = this.serviceEtablissementService.singleData$.subscribe(
      (service) => {
        this.service = service;
      }
    );

    this.etablissementSubscription = this.etablissementService.singleData$.subscribe(
      (etablissement) => (this.etablissement = etablissement)
    );
  }

  addEmploye() {
    this.onAddEmploye = true;
    this.helper.toggleModal("employe-create-modal");
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
    this.etablissementSubscription.unsubscribe();
  }
}
