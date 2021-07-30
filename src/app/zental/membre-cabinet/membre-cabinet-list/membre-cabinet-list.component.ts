import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { MinistereService } from "../../ministere/ministere.service";
import { MinistreService } from "../../ministre/ministre.service";
import { MembreCabinetService } from "../membre-cabinet.service";

@Component({
  selector: "app-membre-cabinet-list",
  templateUrl: "./membre-cabinet-list.component.html",
  styleUrls: ["./membre-cabinet-list.component.scss"],
})
export class MembreCabinetListComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    public membreCabinetService: MembreCabinetService,
    public router: Router,
    public route: ActivatedRoute,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService
  ) {
    super(membreCabinetService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params): void {
    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this._getByMinistere(ministere.id, params);
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this._getByAmbassade(ambassade.id, params);
        });
    } else if (this.router.url.includes("consulat")) {
      this._subscription["consulat"] =
        this.consulatService.singleData$.subscribe((consulat) => {
          this._getByConsulat(consulat.id, params);
        });
    }
  }

  _getByMinistere(ministere: number, params: Params): void {
    this.loading = true;
    this.membreCabinetService
      .getByMinistere(ministere, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  _getByAmbassade(ambassade: number, params: Params): void {
    this.loading = true;
    this.membreCabinetService
      .getByAmbassade(ambassade, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  _getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.membreCabinetService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }
}
