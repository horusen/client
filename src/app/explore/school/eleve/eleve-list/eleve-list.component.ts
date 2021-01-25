import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { EleveService } from "../../eleve.service";

@Component({
  selector: "app-eleve-list",
  templateUrl: "./eleve-list.component.html",
  styleUrls: ["./eleve-list.component.scss"],
})
export class EleveListComponent extends BaseComponent implements OnInit {
  international: boolean = false;
  constructor(
    public eleveService: EleveService,
    public classeService: ClasseService,
    public route: ActivatedRoute
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this._subscription["loading"] = this.eleveService.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    );

    this.route.queryParams.subscribe((params) => {
      params["international"]
        ? params["international"] == "true"
          ? this.getEleveInternationals()
          : null
        : this.getByClasse();
    });
  }

  getEleveInternationals() {
    console.log("international");
    this.international = true;
    this.loading = true;
    this.eleveService.getElevesInternationals().subscribe(() => {
      this.loading = false;
    });
  }

  getByClasse() {
    this._subscription["classe"] = this.classeService.singleData$.subscribe(
      (classe) => {
        console.log("classe");
        this._getByClasse(classe.id);
      }
    );
  }

  _getByClasse(classe: number) {
    this.loading = true;
    this.eleveService.getByClasse(classe).subscribe(() => {
      this.loading = false;
    });
  }
}
