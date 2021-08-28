import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { PasserelleService } from "../passerelle.service";

@Component({
  selector: "app-passerelle-list",
  templateUrl: "./passerelle-list.component.html",
  styleUrls: ["./passerelle-list.component.scss"],
})
export class PasserelleListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  constructor(
    public passerelleService: PasserelleService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(passerelleService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params): void {
    if (this.parent.name === "zental") {
      this.getAll(params);
    } else {
      this.getByPays(
        this.parent.item.entite_diplomatique.pays_origine?.id,
        params
      );
    }
  }

  getAll(params: Params): void {
    this.loading = true;
    this.passerelleService.getAll(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByPays(pays: number, params: Params) {
    this.loading = true;
    this.passerelleService.getByPays(pays, params).subscribe(() => {
      this.loading = false;
    });
  }
}
