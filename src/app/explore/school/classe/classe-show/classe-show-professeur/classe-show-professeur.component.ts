import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ProfesseurService } from "../../../professeur/professeur.service";
import { ClasseService } from "../../classe.service";

@Component({
  selector: "app-classe-show-professeur",
  templateUrl: "./classe-show-professeur.component.html",
  styleUrls: ["./classe-show-professeur.component.scss"],
})
export class ClasseShowProfesseurComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public classeService: ClasseService,
    public professeurService: ProfesseurService
  ) {
    super(professeurService);
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
    this.professeurService.getByClasse(classe).subscribe(() => {
      this.loading = false;
    });
  }
}
