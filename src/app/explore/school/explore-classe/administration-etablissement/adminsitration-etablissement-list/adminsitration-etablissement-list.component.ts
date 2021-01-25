import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";

@Component({
  selector: "app-adminsitration-etablissement-list",
  templateUrl: "./adminsitration-etablissement-list.component.html",
  styleUrls: ["./adminsitration-etablissement-list.component.scss"],
})
export class AdminsitrationEtablissementListComponent
  extends BaseComponent
  implements OnInit {
  constructor(public etablissementService: EtablissementService) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.etablissementService
      .getEtablissementsWhereUserIsAdmin()
      .subscribe(() => {
        this.loading = false;
      });
  }

  // selectEtablissement(etablissement: number) {
  //   this.etablissementService.getSingle(etablissement);
  // }
}
