import { SousDomaineService } from "src/app/explore/school/sous-domaine/sous-domaine.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-sous-reseaux-list-min",
  templateUrl: "./sous-reseaux-list-min.component.html",
  styleUrls: ["./sous-reseaux-list-min.component.scss"],
})
export class SousReseauxListMinComponent
  extends BaseComponent
  implements OnInit {
  constructor(public sousDomaineService: SousDomaineService) {
    super(sousDomaineService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.sousDomaineService.get().subscribe(() => {
      this.loading = false;
    });
  }
}
