import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../eleve.service";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-eleve-list-hors-etablissement",
  templateUrl: "./eleve-list-hors-etablissement.component.html",
  styleUrls: ["./eleve-list-hors-etablissement.component.scss"],
})
export class EleveListHorsEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public eleveService: EleveService,
    public etablissementService: EtablissementService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.getData(this.etablissementService.etablissement.id);
  }

  getData(etablissement: number) {
    this.loading = true;
    this.eleveService.getHorsEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }
}
