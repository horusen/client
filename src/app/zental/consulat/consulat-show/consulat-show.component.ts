import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-show",
  templateUrl: "./consulat-show.component.html",
  styleUrls: ["./consulat-show.component.scss"],
})
export class ConsulatShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  edit = false;
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(consulatService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe({
      next: (fragment) => {
        if (fragment === "edit-consulat") {
          if (this.single) {
            this.edit = true;
            this.helper.toggleModal("consulat-edit-modal");
          } else {
            this.router.navigate(["./"], { relativeTo: this.route });
          }
        }
      },
    });
  }
}
