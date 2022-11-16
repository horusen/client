import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { FonctionService } from "../../fonction.service";

@Component({
  selector: "app-fonction-description",
  templateUrl: "./fonction-description.component.html",
  styleUrls: ["./fonction-description.component.scss"],
})
export class FonctionDescriptionComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public fonctionService: FonctionService) {
    super(fonctionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
