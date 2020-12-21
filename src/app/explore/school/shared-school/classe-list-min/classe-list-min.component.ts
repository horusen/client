import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-classe-list-min",
  templateUrl: "./classe-list-min.component.html",
  styleUrls: ["./classe-list-min.component.scss"],
})
export class ClasseListMinComponent extends BaseComponent implements OnInit {
  constructor(
    public classeService: ClasseService,
    public etablissementService: EtablissementService
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    this._subscription[
      "lastItem"
    ] = this.classeService.lastItemcreated$.subscribe((classe) => {
      this.data.unshift(classe);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.classeService
      .getByEtablissement(this.etablissementService.etablissement.id)
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }
}
