import { Params } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-list",
  templateUrl: "./ministere-list.component.html",
  styleUrls: ["./ministere-list.component.scss"],
})
export class MinistereListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute
  ) {
    super(ministereService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params): void {
    if (this.parent.name === "zental") {
      this.getAll(params);
    } else if (this.parent.name === "admin") {
      this.getByCurrentUser(params);
    }
  }

  getAll(params: Params): void {
    this.loading = true;
    this.ministereService.getAll(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByCurrentUser(params: Params): void {
    this.loading = true;
    this.ministereService.getByCurrentUser(params).subscribe(() => {
      this.loading = false;
    });
  }

  supprimer(ministere: number): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.ministereService.delete(ministere).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
