import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AdresseService } from "../../adresse/adresse.service";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-profil-ministere",
  templateUrl: "./profil-ministere.component.html",
  styleUrls: ["./profil-ministere.component.scss"],
})
export class ProfilMinistereComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public adresseService: AdresseService
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["adresse"] = this.adresseService.data$.subscribe(
      (data) => this.ministereService.addAdresses(data)
    );
  }
}
