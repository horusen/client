import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DossierService } from "../dossier.service";

@Component({
  selector: "app-dossier-list",
  templateUrl: "./dossier-list.component.html",
  styleUrls: ["./dossier-list.component.scss"],
})
export class DossierListComponent extends BaseComponent implements OnInit {
  constructor(public dossierService: DossierService) {
    super(dossierService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.dossierService.initialise().subscribe(() => {
      this.loading = false;
    });
  }
}
