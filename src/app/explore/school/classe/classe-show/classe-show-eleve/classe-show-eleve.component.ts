import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../../eleve.service";
import { ClasseService } from "../../classe.service";

@Component({
  selector: "app-classe-show-eleve",
  templateUrl: "./classe-show-eleve.component.html",
  styleUrls: ["./classe-show-eleve.component.scss"],
})
export class ClasseShowEleveComponent extends BaseComponent implements OnInit {
  constructor(
    public classeService: ClasseService,
    public eleveService: EleveService
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
