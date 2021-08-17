import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { AmbassadeService } from "../ambassade/ambassade.service";
import { DomaineInstitutionService } from "../domaine-institution/domaine-institution.service";
import { MinistereService } from "../ministere/ministere.service";
import { DomaineService } from "./domaine.service";

// Represente domaine institution

@Component({
  selector: "app-domaine",
  templateUrl: "./domaine.component.html",
  styleUrls: ["./domaine.component.scss"],
})
export class DomaineComponent extends BaseContainerComponentComponent {
  @Input() parent: { name: string; item: any };
  ministere: any;
  ambassade: any;

  constructor(
    public domaineService: DomaineInstitutionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(domaineService, router, route);
    this.element = "domaine";
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

  onDomaineCreated(domaine: any): void {
    this.domaineService.unshiftItemInData(domaine);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("domaine-create-modal");
  }

  onDomaineEdit(domaine: any): void {
    this.domaineService.updateItemInData(domaine.id, domaine);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("domaine-edit-modal");
  }
}
