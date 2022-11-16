import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-show",
  templateUrl: "./ministere-show.component.html",
  styleUrls: ["./ministere-show.component.scss"],
})
export class MinistereShowComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  @Input() parent: ParentDefinition;
  edit = false;
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-ministere") {
        if (this.single) {
          this.edit = true;
          this.helper.toggleModal("ministere-edit-modal");
        } else {
          this.router.navigate(["./"], { relativeTo: this.route });
        }
      }
    });
  }
}
