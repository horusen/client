import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DomaineService } from "../../domaine/domaine.service";

@Component({
  selector: "app-reseau-list-min",
  templateUrl: "./reseau-list-min.component.html",
  styleUrls: ["./reseau-list-min.component.scss"],
})
export class ReseauListMinComponent extends BaseComponent implements OnInit {
  constructor(
    public domaineService: DomaineService,
    public route: ActivatedRoute
  ) {
    super(domaineService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.domaineService.get().subscribe(() => {
      this.loading = false;
    });
  }
}
