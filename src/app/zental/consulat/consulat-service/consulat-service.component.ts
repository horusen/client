import { ConsulatService } from "./../consulat.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-consulat-service",
  templateUrl: "./consulat-service.component.html",
  styleUrls: ["./consulat-service.component.scss"],
})
export class ConsulatServiceComponent
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
