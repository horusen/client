import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-list-by-professeur",
  templateUrl: "./classe-list-by-professeur.component.html",
  styleUrls: ["./classe-list-by-professeur.component.scss"],
})
export class ClasseListByProfesseurComponent
  extends BaseComponent
  implements OnInit {
  constructor(public classeService: ClasseService) {
    super(classeService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.classeService.getByUserAsProfesseur().subscribe(() => {
      this.loading = false;
    });
  }
}
