import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { PosteService } from "../../poste.service";

@Component({
  selector: "app-poste-employe",
  templateUrl: "./poste-employe.component.html",
  styleUrls: ["./poste-employe.component.scss"],
})
export class PosteEmployeComponent
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
