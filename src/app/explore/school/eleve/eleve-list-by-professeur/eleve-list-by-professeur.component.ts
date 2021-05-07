import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../eleve.service";

@Component({
  selector: "app-eleve-list-by-professeur",
  templateUrl: "./eleve-list-by-professeur.component.html",
  styleUrls: ["./eleve-list-by-professeur.component.scss"],
})
export class EleveListByProfesseurComponent
  extends BaseComponent
  implements OnInit {
  constructor(public eleveService: EleveService) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.eleveService.getByCurrentUserAsProfesseur().subscribe(() => {
      this.loading = false;
    });
  }
}
