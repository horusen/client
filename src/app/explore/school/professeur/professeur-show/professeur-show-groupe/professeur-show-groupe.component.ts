import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../../groupe/groupe.service";
import { ProfesseurService } from "../../professeur.service";

@Component({
  selector: "app-professeur-show-groupe",
  templateUrl: "./professeur-show-groupe.component.html",
  styleUrls: ["./professeur-show-groupe.component.scss"],
})
export class ProfesseurShowGroupeComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public professeurService: ProfesseurService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription[
      "professeur"
    ] = this.professeurService.singleData$.subscribe((professeur) => {
      this.getData(professeur.id);
    });
  }

  getData(professeur: number) {
    this.loading = true;
    this.groupeService.getByProfesseur(professeur).subscribe(() => {
      this.loading = false;
    });
  }
}
