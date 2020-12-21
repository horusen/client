import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { EleveService } from "../../eleve.service";

@Component({
  selector: "app-eleve-list",
  templateUrl: "./eleve-list.component.html",
  styleUrls: ["./eleve-list.component.scss"],
})
export class EleveListComponent extends BaseComponent implements OnInit {
  constructor(
    public eleveService: EleveService,
    public classeService: ClasseService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this._subscription["classe"] = this.classeService.singleData$.subscribe(
      (classe) => {
        this.getData(classe.id);
      }
    );
  }

  getData(classe: number) {
    this.loading = true;
    this.eleveService.getByClasse(classe).subscribe(() => {
      this.loading = false;
    });
  }
}
