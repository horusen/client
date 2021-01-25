import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-list",
  templateUrl: "./groupe-list.component.html",
  styleUrls: ["./groupe-list.component.scss"],
})
export class GroupeListComponent extends BaseComponent implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public router: Router,
    public etablissementService: EtablissementService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    if (this.router.url.includes("ancien")) {
      this.getAnciensGroupes();
    } else {
      this.getData();
    }
  }

  getData() {
    this.loading = true;
    this.groupeService.get().subscribe(() => {
      this.loading = false;
    });
  }

  getAnciensGroupes() {
    this.loading = true;
    this.groupeService
      .getAnciensGroupes(this.etablissementService.etablissement.id)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
