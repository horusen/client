import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ClasseService } from "../../classe/classe.service";

@Component({
  selector: "app-explore-classe-details",
  templateUrl: "./explore-classe-details.component.html",
  styleUrls: ["./explore-classe-details.component.scss"],
})
export class ExploreClasseDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public classeService: ClasseService,
    public route: ActivatedRoute
  ) {
    super(classeService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.getClasse(+params["id"]);
    });
  }

  getClasse(classe: number) {
    this.loading = true;
    this.classeService.getSingle(classe).subscribe(() => {
      this.loading = false;
    });
  }
}
