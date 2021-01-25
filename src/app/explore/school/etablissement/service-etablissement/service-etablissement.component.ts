import { Subscription } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../etablissement.service";

@Component({
  selector: "app-service-etablissement",
  templateUrl: "./service-etablissement.component.html",
  styleUrls: ["./service-etablissement.component.scss"],
})
export class ServiceEtablissementComponent implements OnInit {
  etablissement: any;
  etablissementSubscription: Subscription
  constructor(public etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.etablissementSubscription = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
    });
  }
}
