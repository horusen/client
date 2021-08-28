import { ActivatedRoute } from "@angular/router";
import { ConsulatService } from "./../consulat.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-consulat-bureaux",
  templateUrl: "./consulat-bureaux.component.html",
  styleUrls: ["./consulat-bureaux.component.scss"],
})
export class ConsulatBureauxComponent
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
