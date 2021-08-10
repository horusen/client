import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { PosteService } from "../../poste.service";

@Component({
  selector: "app-poste-description",
  templateUrl: "./poste-description.component.html",
  styleUrls: ["./poste-description.component.scss"],
})
export class PosteDescriptionComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public posteService: PosteService) {
    super(posteService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
