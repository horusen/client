import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { PosteService } from "../poste.service";

@Component({
  selector: "app-poste-show",
  templateUrl: "./poste-show.component.html",
  styleUrls: ["./poste-show.component.scss"],
})
export class PosteShowComponent extends BaseSingleComponent implements OnInit {
  edit = false;
  constructor(
    public posteService: PosteService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(posteService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("poste-edit-modal");
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.posteService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
