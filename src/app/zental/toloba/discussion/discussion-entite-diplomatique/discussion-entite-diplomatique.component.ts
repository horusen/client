import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { TolobaEntiteDiplomatiqueService } from "../../toloba-entite-diplomatique/toloba-entite-diplomatique.service";

@Component({
  selector: "app-discussion-entite-diplomatique",
  templateUrl: "./discussion-entite-diplomatique.component.html",
  styleUrls: ["./discussion-entite-diplomatique.component.scss"],
})
export class DiscussionEntiteDiplomatiqueComponent
  extends BaseComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  serviceCommunication: any;

  constructor(public tolobaService: TolobaEntiteDiplomatiqueService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["service-communication"] =
      this.tolobaService.serviceCommunication$.subscribe((service) => {
        this.serviceCommunication = service;
      });
  }
}
