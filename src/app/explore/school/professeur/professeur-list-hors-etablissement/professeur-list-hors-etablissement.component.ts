import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { ProfesseurService } from "../professeur.service";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-professeur-list-hors-etablissement",
  templateUrl: "./professeur-list-hors-etablissement.component.html",
  styleUrls: ["./professeur-list-hors-etablissement.component.scss"],
})
export class ProfesseurListHorsEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public professeurService: ProfesseurService,
    public etablissementService: EtablissementService
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    // this.getData(this.etablissementService.etablissement.id);
  }

  // getData(etablissement: number) {
  //   this.loading = true;
  //   this.professeurService.getHorsEtablissement(etablissement).subscribe(() => {
  //     this.loading = false;
  //   });
  // }
}
