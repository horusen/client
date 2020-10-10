import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { SousDomaineClasseService } from "./sous-domaine-classe.service";

@Component({
  selector: "app-sous-domaine-classe-list",
  templateUrl: "./sous-domaine-classe-list.component.html",
  styleUrls: ["./sous-domaine-classe-list.component.scss"],
})
export class SousDomaineClasseListComponent
  extends BaseComponent
  implements OnInit {
  @Input() domaine: number;
  constructor(public sousDomaineClasseService: SousDomaineClasseService) {
    super(sousDomaineClasseService);
  }

  ngOnInit() {
    this.getDataByDomaine(this.domaine);
  }

  getDataByDomaine(domaine: number) {
    this.loading = true;
    this.sousDomaineClasseService
      .getDataByDomaine(domaine)
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }
}
