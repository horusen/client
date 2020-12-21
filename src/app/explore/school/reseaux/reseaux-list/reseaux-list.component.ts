import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DomaineService } from "../../domaine/domaine.service";

@Component({
  selector: "app-reseaux-list",
  templateUrl: "./reseaux-list.component.html",
  styleUrls: ["./reseaux-list.component.scss"],
})
export class ReseauxListComponent extends BaseComponent implements OnInit {
  constructor(public domaineService: DomaineService) {
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
