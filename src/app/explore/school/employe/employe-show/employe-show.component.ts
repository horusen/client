import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { EmployeService } from "../employe.service";

@Component({
  selector: "app-employe-show",
  templateUrl: "./employe-show.component.html",
  styleUrls: ["./employe-show.component.scss"],
})
export class EmployeShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public employeService: EmployeService,
    public route: ActivatedRoute
  ) {
    super(employeService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
