import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { FormationService } from "../../../formation/formation.service";
import { ProgrammeService } from "../../../programme.service";

@Component({
  selector: "app-programme-show-formation",
  templateUrl: "./programme-show-formation.component.html",
  styleUrls: ["./programme-show-formation.component.scss"],
})
export class ProgrammeShowFormationComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public programmeService: ProgrammeService,
    public formationService: FormationService
  ) {
    super(formationService);
  }

  ngOnInit(): void {
    this._subscription[
      "programme"
    ] = this.programmeService.singleData$.subscribe((programme) => {
      this.getData(programme.id);
    });
  }

  getData(programme: number) {
    this.loading = true;
    this.formationService.getByProgramme(programme).subscribe(() => {
      this.loading = false;
    });
  }
}
