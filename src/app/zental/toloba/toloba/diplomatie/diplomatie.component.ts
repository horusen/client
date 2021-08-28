import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DiplomatieService } from "src/app/zental/diplomatie/diplomatie.service";

@Component({
  selector: "app-diplomatie",
  templateUrl: "./diplomatie.component.html",
  styleUrls: ["./diplomatie.component.scss"],
})
export class DiplomatieComponent extends BaseSingleComponent implements OnInit {
  constructor(
    public diplomatieService: DiplomatieService,
    public route: ActivatedRoute
  ) {
    super(diplomatieService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
