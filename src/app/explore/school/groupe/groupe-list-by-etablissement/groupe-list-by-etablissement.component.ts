import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-list-by-etablissement",
  templateUrl: "./groupe-list-by-etablissement.component.html",
  styleUrls: ["./groupe-list-by-etablissement.component.scss"],
})
export class GroupeListByEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public etablissementService: EtablissementService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription[
      "last-item"
    ] = this.groupeService.lastItemcreated$.subscribe((groupe) => {
      this.data.unshift(groupe);
    });

    this.getData(this.etablissementService.etablissement.id);
  }

  getData(etablissement: number) {
    this.loading = true;
    this.groupeService
      .getByEtablissement(etablissement)
      .subscribe((groupes) => {
        this.data = groupes;
        this.loading = false;
      });
  }
}
