import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { AmbassadeService } from "../ambassade/ambassade.service";
import { MinistereService } from "../ministere/ministere.service";
import { BureauService } from "./bureau.service";

@Component({
  selector: "app-bureau",
  templateUrl: "./bureau.component.html",
  styleUrls: ["./bureau.component.scss"],
})
export class BureauComponent extends BaseContainerComponentComponent {
  @Input() parent: ParentDefinition;
  extraFields: any;
  constructor(
    public bureauService: BureauService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(bureauService, router, route);
    this.element = "bureau";
  }

  ngOnInit(): void {
    this.extraFields = {
      pays: this.parent.item.entite_diplomatique.pays_origine.id,
      [this.parent.name]: this.parent.item.id,
    };

    console.log(this.extraFields);
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
