import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DepartementService } from "../../departement.service";

@Component({
  selector: "app-departement-services",
  templateUrl: "./departement-services.component.html",
  styleUrls: ["./departement-services.component.scss"],
})
export class DepartementServicesComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public departementService: DepartementService) {
    super(departementService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
