import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-filter-ambassade",
  templateUrl: "./filter-ambassade.component.html",
  styleUrls: ["./filter-ambassade.component.scss"],
})
export class FilterAmbassadeComponent
  extends BaseCreateComponent
  implements OnInit
{
  dependancies = {
    continents: [],
    langues: [],
  };

  dependanciesLoading = {
    continents: false,
    langues: false,
  };

  constructor(public ambassadeService: AmbassadeService) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    this.form = this.initialiseForm();
  }

  initialiseForm(): FormGroup {
    return this.fb.group({
      continents: [[]],
      langues: [[]],
      etats: [[]],
    });
  }
}
