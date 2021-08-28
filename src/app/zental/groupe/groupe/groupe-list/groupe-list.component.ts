import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-list",
  templateUrl: "./groupe-list.component.html",
  styleUrls: ["./groupe-list.component.scss"],
})
export class GroupeListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params): void {
    if (this.parent.name === "user") {
      this.getByUser(this.parent.item.id_inscription, params);
    }
  }

  getByUser(user: number, params: Params): void {
    this.loading = true;
    this.groupeService.getByUser(user, params).subscribe(() => {
      this.loading = false;
    });
  }
}
