import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DemandeAdhesionGroupeService } from "../demande-adhesion-groupe.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-demande-adhesion-groupe",
  templateUrl: "./demande-adhesion-groupe.component.html",
  styleUrls: ["./demande-adhesion-groupe.component.scss"],
})
export class DemandeAdhesionGroupeComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public demandeAdhesionService: DemandeAdhesionGroupeService,
    public groupeService: GroupeService
  ) {
    super(demandeAdhesionService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.getByGroupe(groupe.id);
      }
    );
  }

  getByGroupe(groupe: number) {
    this.loading = true;
    this.demandeAdhesionService.getByGroupe(groupe).subscribe(() => {
      this.loading = false;
    });
  }
}
