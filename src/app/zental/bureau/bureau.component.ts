import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { AmbassadeService } from "../ambassade/ambassade.service";
import { MinistereService } from "../ministere/ministere.service";
import { BureauService } from "./bureau.service";

@Component({
  selector: "app-bureau",
  templateUrl: "./bureau.component.html",
  styleUrls: ["./bureau.component.scss"],
})
export class BureauComponent extends BaseContainerComponentComponent {
  ministere: any;
  ambassade: any;
  constructor(
    public bureauService: BureauService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(bureauService, router, route);
    this.element = "bureau";
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

  onBureauCreated(bureau: any): void {
    this.bureauService.unshiftItemInData(bureau);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("bureau-create-modal");
  }

  onBureauEdit(bureau: any): void {
    this.bureauService.updateItemInData(bureau.id, bureau);
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("bureau-edit-modal");
  }
}
