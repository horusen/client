import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistreService } from "./ministre.service";

@Component({
  selector: "app-ministre",
  templateUrl: "./ministre.component.html",
  styleUrls: ["./ministre.component.scss"],
})
export class MinistreComponent extends BaseComponent implements OnInit {
  create = false;
  edit = false;
  filtre = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public ministreService: MinistreService
  ) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "add-ministre") {
        this.create = true;
        this.helper.toggleModal("ministre-add-modal");
      } else if (fragment === "edit-ministre") {
        if (this.ministreService.singleData) {
          this.edit = true;
          this.helper.toggleModal("ministre-edit-modal");
        } else {
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
        }
      }
    });
  }
}
