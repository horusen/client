import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../groupe/groupe.service";
import { DemandeAdhesionGroupeService } from "./demande-adhesion-groupe.service";

@Component({
  selector: "app-demande-adhesion-groupe",
  templateUrl: "./demande-adhesion-groupe.component.html",
  styleUrls: ["./demande-adhesion-groupe.component.scss"],
})
export class DemandeAdhesionGroupeComponent
  extends BaseComponent
  implements OnInit
{
  groupe: any;
  constructor(
    public demandeAdhesionService: DemandeAdhesionGroupeService,
    public groupeService: GroupeService,
    public route: ActivatedRoute
  ) {
    super(demandeAdhesionService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.route.queryParams.subscribe((params) => {
          this.getByGroupe(groupe.id, params);
        });
      }
    );
  }

  getByGroupe(groupe: number, params: Params): void {
    this.loading = true;
    this.demandeAdhesionService.getByGroupe(groupe, params).subscribe(() => {
      this.loading = false;
    });
  }
}
