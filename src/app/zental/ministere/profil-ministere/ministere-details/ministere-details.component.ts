import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../../ministere.service";

@Component({
  selector: "app-ministere-details",
  templateUrl: "./ministere-details.component.html",
  styleUrls: ["./ministere-details.component.scss"],
})
export class MinistereDetailsComponent
  extends BaseSingleComponent
  implements OnInit
{
  editHistoire: true;
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-histoire") {
        this.editHistoire = true;
        this.helper.toggleModal("histoire-modal");
      }
    });
  }

  histoireEditedHandler(ministere: any): void {
    this.ministereService.setFieldInSingleData("histoire", ministere.histoire);
    this.helper.toggleModal("histoire-modal");
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
