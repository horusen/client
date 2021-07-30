import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { AmbassadeService } from "../ambassade/ambassade.service";
import { MinistereService } from "../ministere/ministere.service";
import { DepartementService } from "./departement.service";

@Component({
  selector: "app-departement",
  templateUrl: "./departement.component.html",
  styleUrls: ["./departement.component.scss"],
})
export class DepartementComponent extends BaseContainerComponentComponent {
  ministere: any;
  ambassade: any;

  constructor(
    public departementService: DepartementService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(departementService, router, route);
    this.element = "departement";
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

  onDepartementCreated(departement: any): void {
    this.departementService.unshiftItemInData(departement);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("departement-create-modal");
  }

  onDepartementEdit(departement: any): void {
    this.departementService.updateItemInData(departement.id, departement);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("departement-edit-modal");
  }
}
