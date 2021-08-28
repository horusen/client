import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { ConsulatService } from "../../consulat.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-consulat-ici-mon-pays",
  templateUrl: "./consulat-ici-mon-pays.component.html",
  styleUrls: ["./consulat-ici-mon-pays.component.scss"],
})
export class ConsulatIciMonPaysComponent
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
