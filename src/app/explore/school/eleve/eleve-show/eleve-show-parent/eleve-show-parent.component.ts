import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../../eleve.service";
import { ParentEleveService } from "../../../parent-eleve/parent-eleve.service";

@Component({
  selector: "app-eleve-show-parent",
  templateUrl: "./eleve-show-parent.component.html",
  styleUrls: ["./eleve-show-parent.component.scss"],
})
export class EleveShowParentComponent extends BaseComponent implements OnInit {
  constructor(
    public parentService: ParentEleveService,
    public eleveService: EleveService,
    public route: ActivatedRoute
  ) {
    super(parentService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this._subscription["eleve"] = this.eleveService.singleData$.subscribe(
        (eleve) => {
          this.getData(eleve.id, queryParams);
        }
      );
    });
  }

  getData(eleve: number, params: Params): void {
    this.loading = true;
    this.parentService.getByEleve(eleve, params).subscribe(() => {
      this.loading = false;
    });
  }
}
