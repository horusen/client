import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { AmbassadeService } from "./../ambassade.service";
import { Component, Input, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-ambassade-show",
  templateUrl: "./ambassade-show.component.html",
  styleUrls: ["./ambassade-show.component.scss"],
})
export class AmbassadeShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  edit = false;
  constructor(
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe({
      next: (fragment) => {
        if (fragment === "edit-ambassade") {
          if (this.single) {
            this.edit = true;
            this.helper.toggleModal("ambassade-edit-modal");
          } else {
            this.router.navigate(["./"], { relativeTo: this.route });
          }
        }
      },
    });
  }
}
