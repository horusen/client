import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../eleve.service";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-eleve-list-by-etablissement",
  templateUrl: "./eleve-list-by-etablissement.component.html",
  styleUrls: ["./eleve-list-by-etablissement.component.scss"],
})
export class EleveListByEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public eleveService: EleveService,
    public etablissementService: EtablissementService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this._subscription[ 'etablissement'] = this.etablissementService.singleData$.subscribe(etablissement => {
      this.getData(etablissement.id);
    })
  }

  getData(etablissement: number) {
    this.loading = true;
    this.eleveService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }
}
