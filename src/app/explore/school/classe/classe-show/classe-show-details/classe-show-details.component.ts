import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ClasseService } from "../../classe.service";

@Component({
  selector: "app-classe-show-details",
  templateUrl: "./classe-show-details.component.html",
  styleUrls: ["./classe-show-details.component.scss"],
})
export class ClasseShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public classeService: ClasseService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(classeService, route);
  }

  ngOnInit(): void {
    this.enableSubscribeToLoading = true;
    super.ngOnInit();
  }
}
