import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ParentEleveService } from "../parent-eleve.service";

@Component({
  selector: "app-parent-eleve-list-by-etablissement",
  templateUrl: "./parent-eleve-list-by-etablissement.component.html",
  styleUrls: ["./parent-eleve-list-by-etablissement.component.scss"],
})
export class ParentEleveListByEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public parentEleveService: ParentEleveService,
    public etablissementService: EtablissementService
  ) {
    super(parentEleveService);
  }

  ngOnInit(): void {
    this._subscription['etablissement'] = this.etablissementService.singleData$.subscribe(etablissement => {
      this.getData(etablissement.id);
    })
  }

  getData(etablissement: number) {
    this.loading = true;
    this.parentEleveService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }
}
