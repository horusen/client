import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DomaineClasseService } from "./domaine-classe.service";

@Component({
  selector: "app-domaine-classe-list",
  templateUrl: "./domaine-classe-list.component.html",
  styleUrls: ["./domaine-classe-list.component.scss"],
})
export class DomaineClasseListComponent
  extends BaseComponent
  implements OnInit {
  constructor(public domaineClasseService: DomaineClasseService) {
    super(domaineClasseService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    if (!this.domaineClasseService.data.length) {
      this.loading = true;
      this.domaineClasseService.get().subscribe(() => {
        this.loading = false;
      });
    }
  }
}
