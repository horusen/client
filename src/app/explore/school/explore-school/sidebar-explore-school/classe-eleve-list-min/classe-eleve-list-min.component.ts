import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseEleveService } from "./classe-eleve.service";

@Component({
  selector: "app-classe-eleve-list-min",
  templateUrl: "./classe-eleve-list-min.component.html",
  styleUrls: ["./classe-eleve-list-min.component.scss"],
})
export class ClasseEleveListMinComponent
  extends BaseComponent
  implements OnInit {
  constructor(public classeEleveService: ClasseEleveService) {
    super(classeEleveService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!this.classeEleveService.data.length) {
      this.loading = true;
      this.classeEleveService.initialise().subscribe(() => {
        this.loading = false;
      });
    }
  }
}
