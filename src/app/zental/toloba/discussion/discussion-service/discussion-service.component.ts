import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ServiceService } from "src/app/zental/service/service.service";

@Component({
  selector: "app-discussion-service",
  templateUrl: "./discussion-service.component.html",
  styleUrls: ["./discussion-service.component.scss"],
})
export class DiscussionServiceComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public serviceService: ServiceService,
    public route: ActivatedRoute
  ) {
    super(serviceService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
