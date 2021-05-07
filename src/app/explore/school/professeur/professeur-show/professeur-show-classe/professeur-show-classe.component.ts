import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../../classe/classe.service";
import { ProfesseurService } from "../../professeur.service";

@Component({
  selector: "app-professeur-show-classe",
  templateUrl: "./professeur-show-classe.component.html",
  styleUrls: ["./professeur-show-classe.component.scss"],
})
export class ProfesseurShowClasseComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public professeurService: ProfesseurService,
    public classeService: ClasseService
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    this._subscription[
      "professeur"
    ] = this.professeurService.singleData$.subscribe((professeur) => {
      this.getData(professeur.id);
    });
  }

  getData(professeur: number) {
    this.loading = true;
    this.classeService.getByProfesseur(professeur).subscribe(() => {
      this.loading = false;
    });
  }
}
