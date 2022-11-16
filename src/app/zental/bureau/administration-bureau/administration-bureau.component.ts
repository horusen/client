import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-administration-bureau",
  templateUrl: "./administration-bureau.component.html",
  styleUrls: ["./administration-bureau.component.scss"],
})
export class AdministrationBureauComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public bureauService: BureauService,
    public route: ActivatedRoute
  ) {
    super(bureauService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
