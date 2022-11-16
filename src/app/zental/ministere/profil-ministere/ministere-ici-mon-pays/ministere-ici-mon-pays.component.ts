import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../../ministere.service";

@Component({
  selector: "app-ministere-ici-mon-pays",
  templateUrl: "./ministere-ici-mon-pays.component.html",
  styleUrls: ["./ministere-ici-mon-pays.component.scss"],
})
export class MinistereIciMonPaysComponent
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
