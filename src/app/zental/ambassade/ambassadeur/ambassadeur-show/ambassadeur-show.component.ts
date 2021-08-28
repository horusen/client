import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ResponsableService } from "src/app/zental/responsable/responsable.service";
import { AmbassadeService } from "../../ambassade.service";

@Component({
  selector: "app-ambassadeur-show",
  templateUrl: "./ambassadeur-show.component.html",
  styleUrls: ["./ambassadeur-show.component.scss"],
})
export class AmbassadeurShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  ambassade: any;
  constructor(
    public responsableService: ResponsableService,
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(responsableService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;

    super.ngOnInit();

    this._subscription["ambassade"] =
      this.ambassadeService.singleData$.subscribe((ambassade) => {
        this.ambassade = ambassade;
        this.getambassadeur({});
        this.route.params.subscribe((params) => {
          this.getambassadeur(params);
        });
      });
  }

  edit(): void {
    this.responsableService.singleData = this.single;
  }

  getambassadeur(params: any): void {
    if (params.id && params?.id != "actuel") {
      this.getByID(params.id);
    } else {
      this.getActuelambassadeur(this.ambassade.id);
    }
  }

  getActuelambassadeur(ambassade: number): void {
    this.loading = true;
    this.responsableService.getByActuelAmbassadeur(ambassade).subscribe(() => {
      this.loading = false;
    });
  }

  getByID(id: number): void {
    this.loading = true;
    this.responsableService.getSingle(id).subscribe(() => {
      this.loading = false;
    });
  }
}
