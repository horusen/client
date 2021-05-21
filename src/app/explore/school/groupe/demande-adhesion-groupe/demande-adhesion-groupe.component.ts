import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../../tache/tunel/tunel.service";
import { DemandeAdhesionGroupeService } from "../demande-adhesion-groupe.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-demande-adhesion-groupe",
  templateUrl: "./demande-adhesion-groupe.component.html",
  styleUrls: ["./demande-adhesion-groupe.component.scss"],
})
export class DemandeAdhesionGroupeComponent
  extends BaseComponent
  implements OnInit
{
  @Input() getBy = "groupe";
  constructor(
    public demandeAdhesionService: DemandeAdhesionGroupeService,
    public tunelService: TunelService,
    public groupeService: GroupeService
  ) {
    super(demandeAdhesionService);
  }

  ngOnInit(): void {
    if (this.getBy === "groupe") {
      this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
        (groupe) => {
          this.getByGroupe(groupe.id);
        }
      );
    } else if (this.getBy === "tunel") {
      this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
        (tunel) => {
          this.getByGroupe(tunel.id_groupe);
        }
      );
    }
  }

  getByGroupe(groupe: number) {
    this.loading = true;
    this.demandeAdhesionService.getByGroupe(groupe).subscribe(() => {
      this.loading = false;
    });
  }
}
