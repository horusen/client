import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";

@Component({
  selector: "app-rebondissement-reaction",
  templateUrl: "./rebondissement-reaction.component.html",
  styleUrls: ["./rebondissement-reaction.component.scss"],
})
export class RebondissementReactionComponent
  extends BaseComponent
  implements OnInit
{
  @Input() rebondissement: any;
  constructor(public imageHandlerService: ImageHandlerService) {
    super();
  }

  ngOnInit(): void {}
}
