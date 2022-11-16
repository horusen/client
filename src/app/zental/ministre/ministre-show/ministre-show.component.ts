import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../../ministere/ministere.service";
import { MinistreService } from "../ministre.service";

@Component({
  selector: "app-ministre-show",
  templateUrl: "./ministre-show.component.html",
  styleUrls: ["./ministre-show.component.scss"],
})
export class MinistreShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  ministere: any;
  constructor(
    public ministreService: MinistreService,
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministreService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;

    super.ngOnInit();

    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.ministere = ministere;
        this.getMinistre({});
        this.route.params.subscribe((params) => {
          this.getMinistre(params);
        });
      });
  }

  edit(): void {
    this.ministreService.singleData = this.single;
  }

  getMinistre(params: any): void {
    if (params.id && params?.id != "actuel") {
      this.getByID(params.id);
    } else {
      this.getActuelMinistre(this.ministere.id);
    }
  }

  getActuelMinistre(ministere: number): void {
    this.loading = true;
    this.ministreService.getActuelMinistre(ministere).subscribe(() => {
      this.loading = false;
    });
  }

  getByID(id: number): void {
    this.loading = true;
    this.ministreService.getSingle(id).subscribe(() => {
      this.loading = false;
    });
  }
}
