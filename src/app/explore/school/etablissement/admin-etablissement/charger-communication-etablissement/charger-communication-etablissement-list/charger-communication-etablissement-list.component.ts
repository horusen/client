import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../../etablissement.service";
import { ChargerCommunicationEtablissementService } from "../charger-communication-etablissement.service";

@Component({
  selector: "app-charger-communication-etablissement-list",
  templateUrl: "./charger-communication-etablissement-list.component.html",
  styleUrls: ["./charger-communication-etablissement-list.component.scss"],
})
export class ChargerCommunicationEtablissementListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public chargerComService: ChargerCommunicationEtablissementService,
    public etablissementService: EtablissementService
  ) {
    super(chargerComService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) =>
      this.getByEtablissement(etablissement.id)
    );
  }

  getByEtablissement(etablissement: number) {
    this.loading = true;
    this.chargerComService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }

  delete(id: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.chargerComService.delete(id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
