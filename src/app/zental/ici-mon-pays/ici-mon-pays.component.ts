import { BaseComponent } from "./../../shared/components/base-component/base.component";
import { Router } from "@angular/router";
import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { Component, OnInit } from "@angular/core";
import { IciMonPaysService } from "../ici-mon-pays.service";
import { ConsulatService } from "../consulat/consulat.service";
import { AmbassadeService } from "../ambassade/ambassade.service";

@Component({
  selector: "app-ici-mon-pays",
  templateUrl: "./ici-mon-pays.component.html",
  styleUrls: ["./ici-mon-pays.component.scss"],
})
export class IciMonPaysComponent extends BaseComponent implements OnInit {
  private _pays: any;

  set pays(pays: any) {
    this._pays = pays;
    this.iciMonPaysService.pays$.next(this._pays);
  }
  constructor(
    public iciMonPaysService: IciMonPaysService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getPays();
  }

  getPays() {
    const url = this.router.url;
    if (url.includes("ministeres")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.pays = ministere.entite_diplomatique.pays_origine;
        });
    } else if (url.includes("ambassades")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.pays = ambassade.entite_diplomatique.pays_origine;
        });
    } else if (url.includes("consulats")) {
      this._subscription["consulat"] =
        this.consulatService.singleData$.subscribe((consulat) => {
          this.pays = consulat.entite_diplomatique.pays_origine;
        });
    }
  }
}
