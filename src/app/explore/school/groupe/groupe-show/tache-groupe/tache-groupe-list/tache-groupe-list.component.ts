import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AffecterTacheService } from "src/app/explore/school/shared-school/affecter-tache/affecter-tache.service";
import { AffectationTacheService } from "src/app/explore/school/tache/affectation-tache/affectation-tache.service";
import { TacheService } from "src/app/explore/school/tache/tache.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../../groupe.service";

@Component({
  selector: "app-tache-groupe-list",
  templateUrl: "./tache-groupe-list.component.html",
  styleUrls: ["./tache-groupe-list.component.scss"],
})
export class TacheGroupeListComponent extends BaseComponent implements OnInit {
  groupe: any;
  constructor(
    public tacheService: TacheService,
    public affectationTacheService: AffectationTacheService,
    public groupeService: GroupeService,
    public router: Router
  ) {
    super(tacheService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.groupe = groupe;
        this.getData(this.groupe.id);
      }
    );

    this.affectationTacheService.lastItemcreated$.subscribe((affectation) => {
      this.data.unshift(affectation.tache_details);
    });
  }

  getData(groupe: number) {
    this.loading = true;
    this.tacheService.getByGroupe(groupe).subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }

  supprimer(tache: number) {
    this.loading = true;
    this.affectationTacheService
      .supprimerAffectationGroupe(this.groupe.id, tache)
      .subscribe(() => {
        this.data = this.data.filter((item) => item.id != tache);
        this.loading = false;
      });
  }

  navigateTotache(tache: number) {
    this.helper.toggleModal("groupe-show-modal");
    this.router.navigate(["/", "school", "tache", tache]);
  }
}
