import { ActivatedRoute, Params } from "@angular/router";
import { IciMonPaysService } from "src/app/zental/ici-mon-pays.service";
import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { CalendrierEvenementService } from "../calendrier-evenement.service";

@Component({
  selector: "app-calendrier-evenement-list",
  templateUrl: "./calendrier-evenement-list.component.html",
  styleUrls: ["./calendrier-evenement-list.component.scss"],
})
export class CalendrierEvenementListComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    public calendrierService: CalendrierEvenementService,
    public iciMonPaysService: IciMonPaysService,
    public route: ActivatedRoute
  ) {
    super(calendrierService);
  }

  ngOnInit(): void {
    this._subscription["pays"] = this.iciMonPaysService.pays$.subscribe(
      (pays) => {
        this.route.queryParams.subscribe((params) => {
          this.getByPays(pays.id, params);
        });
      }
    );
  }

  getByPays(pays: number, params: Params): void {
    this.loading = true;
    this.calendrierService.getByPays(pays, params).subscribe(() => {
      this.loading = false;
    });
  }
}
