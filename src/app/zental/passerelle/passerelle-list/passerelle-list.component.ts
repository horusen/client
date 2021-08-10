import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistereService } from "../../ministere/ministere.service";
import { PasserelleService } from "../passerelle.service";

@Component({
  selector: "app-passerelle-list",
  templateUrl: "./passerelle-list.component.html",
  styleUrls: ["./passerelle-list.component.scss"],
})
export class PasserelleListComponent extends BaseComponent implements OnInit {
  constructor(
    public passerelleService: PasserelleService,
    public ministereService: MinistereService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(passerelleService);
  }

  ngOnInit(): void {
    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.route.queryParams.subscribe((params) => {
          this.getByPays(ministere.entite_diplomatique.pays_siege.id, params);
        });
      });
  }

  getByPays(pays: number, params: Params) {
    this.loading = true;
    this.passerelleService.getByPays(pays, params).subscribe(() => {
      this.loading = false;
    });
  }
}
