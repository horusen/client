import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DepartementService } from "../departement.service";

@Component({
  selector: "app-departement-show",
  templateUrl: "./departement-show.component.html",
  styleUrls: ["./departement-show.component.scss"],
})
export class DepartementShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  edit = false;
  constructor(
    public departementService: DepartementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(departementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("departement-edit-modal");
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.departementService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
