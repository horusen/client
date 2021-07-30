import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EmployeService } from "../employe.service";

@Component({
  selector: "app-employe-list",
  templateUrl: "./employe-list.component.html",
  styleUrls: ["./employe-list.component.scss"],
})
export class EmployeListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  constructor(
    public employeService: EmployeService,
    public route: ActivatedRoute
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params) {
    if (this.parent.name === "bureau") {
      this.getByBureau(this.parent.item.id, params);
    }
  }

  getByBureau(bureau: number, params: Params): void {
    this.loading = true;
    this.employeService.getByBureau(bureau, params).subscribe(() => {
      this.loading = false;
    });
  }
}
