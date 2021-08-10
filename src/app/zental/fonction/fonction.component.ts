import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { AmbassadeService } from "../ambassade/ambassade.service";
import { ConsulatService } from "../consulat/consulat.service";
import { MinistereService } from "../ministere/ministere.service";
import { FonctionService } from "./fonction.service";

@Component({
  selector: "app-fonction",
  templateUrl: "./fonction.component.html",
  styleUrls: ["./fonction.component.scss"],
})
export class FonctionComponent extends BaseContainerComponentComponent {
  @Input() parent: { name: string; item: any };
  ministere: any;
  ambassade: any;
  consulat: any;

  constructor(
    public fonctionService: FonctionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(fonctionService, router, route);
    this.element = "fonction";
  }

  ngOnInit(): void {
    if (this.parent.name === "ministere") {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => [
          (this.ministere = ministere),
        ]);
    } else if (this.parent.name === "ambassade") {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => [
          (this.ambassade = ambassade),
        ]);
    } else if (this.parent.name === "consulat") {
      this._subscription["consulat"] =
        this.consulatService.singleData$.subscribe((consulat) => [
          (this.consulat = consulat),
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
