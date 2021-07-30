import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { AmbassadeService } from "../ambassade/ambassade.service";
import { MinistereService } from "../ministere/ministere.service";
import { FonctionService } from "./fonction.service";

@Component({
  selector: "app-fonction",
  templateUrl: "./fonction.component.html",
  styleUrls: ["./fonction.component.scss"],
})
export class FonctionComponent extends BaseContainerComponentComponent {
  ministere: any;
  ambassade: any;

  constructor(
    public fonctionService: FonctionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(fonctionService, router, route);
    this.element = "fonction";
  }

  ngOnInit(): void {
    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => [
          (this.ministere = ministere),
        ]);
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => [
          (this.ambassade = ambassade),
        ]);
    }
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
