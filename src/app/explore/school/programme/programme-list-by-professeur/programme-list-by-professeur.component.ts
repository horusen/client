import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ProgrammeService } from "../../programme.service";

@Component({
  selector: "app-programme-list-by-professeur",
  templateUrl: "./programme-list-by-professeur.component.html",
  styleUrls: ["./programme-list-by-professeur.component.scss"],
})
export class ProgrammeListByProfesseurComponent
  extends BaseComponent
  implements OnInit {
  constructor(public programmeService: ProgrammeService) {
    super(programmeService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.programmeService.getByUserAsProfesseur().subscribe(() => {
      this.loading = false;
    });
  }
}
