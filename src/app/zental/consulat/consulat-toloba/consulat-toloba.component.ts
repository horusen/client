import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-toloba",
  templateUrl: "./consulat-toloba.component.html",
  styleUrls: ["./consulat-toloba.component.scss"],
})
export class ConsulatTolobaComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute
  ) {
    super(consulatService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
