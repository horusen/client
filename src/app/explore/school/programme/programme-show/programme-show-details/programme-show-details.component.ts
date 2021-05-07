import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ProgrammeService } from "../../../programme.service";

@Component({
  selector: "app-programme-show-details",
  templateUrl: "./programme-show-details.component.html",
  styleUrls: ["./programme-show-details.component.scss"],
})
export class ProgrammeShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public programmeService: ProgrammeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(programmeService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;
    super.ngOnInit();

    this._subscription["loading"] = this.programmeService.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    );
  }

  getLastUrlFragment(url: string): string {
    const urlWithoutQueryParams = url.split("?")[0];
    const fragmentedUrl = urlWithoutQueryParams.split("/");
    return fragmentedUrl[fragmentedUrl.length - 1];
  }
}
