import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AdresseService } from "./../../adresse/adresse.service";
import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-profil-institution",
  templateUrl: "./profil-institution.component.html",
  styleUrls: ["./profil-institution.component.scss"],
})
export class ProfilInstitutionComponent
  extends BaseComponent
  implements OnInit
{
  @Input() parent: { name: string; item: any };

  adresses = [];

  constructor(
    public adresseService: AdresseService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["adresses"] = this.adresseService.data$.subscribe(
      (adresses) => {
        this.adresses = adresses;
      }
    );
  }
}
