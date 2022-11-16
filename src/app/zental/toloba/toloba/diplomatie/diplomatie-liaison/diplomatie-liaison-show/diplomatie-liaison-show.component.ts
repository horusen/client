import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute } from "@angular/router";
import { LiaisonService } from "src/app/zental/liaison/liaison.service";

@Component({
  selector: "app-diplomatie-liaison-show",
  templateUrl: "./diplomatie-liaison-show.component.html",
  styleUrls: ["./diplomatie-liaison-show.component.scss"],
})
export class DiplomatieLiaisonShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public liaisonService: LiaisonService,
    public route: ActivatedRoute
  ) {
    super(liaisonService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
