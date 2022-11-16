import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { IciMonPaysService } from "../../ici-mon-pays.service";
import { MinistereService } from "../../ministere/ministere.service";

@Component({
  selector: "app-ici-mon-pays-show-element",
  templateUrl: "./ici-mon-pays-show-element.component.html",
  styleUrls: ["./ici-mon-pays-show-element.component.scss"],
})
export class IciMonPaysShowElementComponent
  extends BaseSingleComponent
  implements OnInit
{
  public pays: any;
  private _validElements = [
    "ici-chez-nous",
    "venir-chez-nous",
    "arts-et-cultures",
  ];

  onEdit = false;
  element: string;
  constructor(
    public iciMonPaysService: IciMonPaysService,
    public route: ActivatedRoute,
    public router: Router,
    public ministereService: MinistereService
  ) {
    super(iciMonPaysService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["pays"] = this.iciMonPaysService.pays$.subscribe(
      (pays) => {
        this.pays = pays;
        this.route.params.subscribe((params) => {
          if (this._validElements.includes(params.id)) {
            this.onEdit = false;
            this.element = params.id;
            this.showElement(pays.id, params.id);
          } else {
            this.router.navigate(["ici-chez-nous"], {
              relativeTo: this.route,
              queryParamsHandling: "preserve",
            });
          }
        });
      }
    );
  }

  showElement(pays: number, element: string): void {
    this.loading = true;
    this.iciMonPaysService.showElement(pays, element).subscribe(() => {
      this.loading = false;
    });
  }
}
