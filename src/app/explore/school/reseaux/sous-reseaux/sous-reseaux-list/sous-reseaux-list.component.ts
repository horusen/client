import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DomaineService } from "../../../domaine/domaine.service";
import { SousDomaineService } from "../../../sous-domaine/sous-domaine.service";

@Component({
  selector: "app-sous-reseaux-list",
  templateUrl: "./sous-reseaux-list.component.html",
  styleUrls: ["./sous-reseaux-list.component.scss"],
})
export class SousReseauxListComponent extends BaseComponent implements OnInit {
  constructor(
    public sousDomaineService: SousDomaineService,
    public domaineService: DomaineService
  ) {
    super(sousDomaineService);
  }

  ngOnInit(): void {
    this._subscription["domaine"] = this.domaineService.singleData$.subscribe(
      (domaine) => {
        this.getData(domaine.id);
      }
    );
  }

  getData(domaine: number) {
    this.loading = true;
    this.sousDomaineService.getByDomaine(domaine).subscribe(() => {
      this.loading = false;
    });
  }
}
