import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { PasserelleService } from "./../passerelle.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-passerelle-show",
  templateUrl: "./passerelle-show.component.html",
  styleUrls: ["./passerelle-show.component.scss"],
})
export class PasserelleShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  affecter = false;
  edit = false;
  ministere: any;
  constructor(
    public passerelleService: PasserelleService,
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(passerelleService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.ministere = ministere;
      });
  }

  affecterPasserelle(): void {
    this.affecter = true;
    this.helper.toggleModal("affecter-passerelle-modal");
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.passerelleService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
        this.router.navigate([".."], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    });
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("passerelle-edit-modal");
  }
}
