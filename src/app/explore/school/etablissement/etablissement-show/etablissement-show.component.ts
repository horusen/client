import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../etablissement.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-etablissement-show",
  templateUrl: "./etablissement-show.component.html",
  styleUrls: ["./etablissement-show.component.scss"],
})
export class EtablissementShowComponent
  extends BaseSingleComponent
  implements OnInit {
  private _urlLastItem: string;

  get urlLastItem(): any {
    const fragmentedUrl = this.router.url.split("/");
    const urlLastItem = fragmentedUrl[fragmentedUrl.length - 1];
    return isNaN(parseInt(urlLastItem)) ? urlLastItem : "./";
  }

  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
