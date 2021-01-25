import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ProfesseurService } from "../../professeur/professeur.service";

@Component({
  selector: "app-professeur-list-min",
  templateUrl: "./professeur-list-min.component.html",
  styleUrls: ["./professeur-list-min.component.scss"],
})
export class ProfesseurListMinComponent
  extends BaseComponent
  implements OnInit {
  constructor(public professeurService: ProfesseurService) {
    super(professeurService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.professeurService.getByUserClasse().subscribe(() => {
      this.loading = false;
    });
  }
}
