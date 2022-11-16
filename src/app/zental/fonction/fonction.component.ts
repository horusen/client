import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";

import { FonctionService } from "./fonction.service";

@Component({
  selector: "app-fonction",
  templateUrl: "./fonction.component.html",
  styleUrls: ["./fonction.component.scss"],
})
export class FonctionComponent extends BaseContainerComponentComponent {
  @Input() parent: { name: string; item: any };
  extraFields: any;

  constructor(
    public fonctionService: FonctionService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(fonctionService, router, route);
    this.element = "fonction";
  }

  ngOnInit(): void {
    this.extraFields = { [this.parent.name]: this.parent.item.id };
  }

  onFonctionCreated(fonction: any): void {
    this.fonctionService.unshiftItemInData(fonction);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("fonction-create-modal");
  }

  onFonctionEdit(fonction: any): void {
    this.fonctionService.updateItemInData(fonction.id, fonction);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("fonction-edit-modal");
  }
}
