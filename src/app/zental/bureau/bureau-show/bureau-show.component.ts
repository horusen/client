import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { BureauService } from "../bureau.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bureau-show",
  templateUrl: "./bureau-show.component.html",
  styleUrls: ["./bureau-show.component.scss"],
})
export class BureauShowComponent extends BaseSingleComponent implements OnInit {
  constructor(
    public bureauService: BureauService,
    public route: ActivatedRoute
  ) {
    super(bureauService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
