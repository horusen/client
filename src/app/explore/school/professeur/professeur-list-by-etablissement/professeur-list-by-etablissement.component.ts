import { ProfesseurService } from "./../professeur.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-professeur-list-by-etablissement",
  templateUrl: "./professeur-list-by-etablissement.component.html",
  styleUrls: ["./professeur-list-by-etablissement.component.scss"],
})
export class ProfesseurListByEtablissementComponent
  extends BaseComponent
  implements OnInit {
  etablissement: any;
  constructor(
    public professeurService: ProfesseurService,
    public etablissementService: EtablissementService
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    this.etablissement = this.etablissementService.etablissement;
    if (this.etablissement) {
      this.getData(this.etablissement.id);
    }
  }

  getData(etablissement: number) {
    this.loading = true;
    this.professeurService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }
}
