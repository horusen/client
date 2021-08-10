import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
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
    public route: ActivatedRoute
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
