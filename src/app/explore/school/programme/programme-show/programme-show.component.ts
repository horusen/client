import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ProgrammeService } from "../../programme.service";

@Component({
  selector: "app-programme-show",
  templateUrl: "./programme-show.component.html",
  styleUrls: ["./programme-show.component.scss"],
})
export class ProgrammeShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public programmeService: ProgrammeService,
    public route: ActivatedRoute
  ) {
    super(programmeService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  getSingle(route: ActivatedRoute) {
    route.params.subscribe((param) => {
      this.service.loading$.next(true);
      this.id = this.helper.parseInt(param["id"]);
      this.service.getSingle(this.id).subscribe(() => {
        this.service.loading$.next(false);
      });
    });
  }
}
