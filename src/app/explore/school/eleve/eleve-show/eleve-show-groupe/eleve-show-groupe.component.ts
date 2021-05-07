import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../../eleve.service";
import { GroupeService } from "../../../groupe/groupe.service";

@Component({
  selector: "app-eleve-show-groupe",
  templateUrl: "./eleve-show-groupe.component.html",
  styleUrls: ["./eleve-show-groupe.component.scss"],
})
export class EleveShowGroupeComponent extends BaseComponent implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public eleveService: EleveService,
    public route: ActivatedRoute
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this._subscription["eleve"] = this.eleveService.singleData$.subscribe(
        (eleve) => {
          this.getData(eleve.id, params);
        }
      );
    });
  }

  getData(eleve: number, params: Params): void {
    this.loading = true;
    this.groupeService.getByEleve(eleve, params).subscribe(() => {
      this.loading = false;
    });
  }
}
