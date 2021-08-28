import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-bureaux",
  templateUrl: "./ministere-bureaux.component.html",
  styleUrls: ["./ministere-bureaux.component.scss"],
})
export class MinistereBureauxComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.firstChild.params.subscribe((params) => {
      if (params.id) {
        if (this.router.url.includes("administration")) {
          this.router.navigate(["/", "administration", "bureaux", params.id]);
        } else {
          this.router.navigate(["/", "bureaux", params.id]);
        }
      }
    });
  }
}
