import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ServiceService } from "../service.service";

@Component({
  selector: "app-service-show",
  templateUrl: "./service-show.component.html",
  styleUrls: ["./service-show.component.scss"],
})
export class ServiceShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  edit = false;
  constructor(
    public serviceService: ServiceService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(serviceService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("service-edit-modal");
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.serviceService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
