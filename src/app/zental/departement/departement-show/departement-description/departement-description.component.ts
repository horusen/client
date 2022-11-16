import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DepartementService } from "../../departement.service";

@Component({
  selector: "app-departement-description",
  templateUrl: "./departement-description.component.html",
  styleUrls: ["./departement-description.component.scss"],
})
export class DepartementDescriptionComponent
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
