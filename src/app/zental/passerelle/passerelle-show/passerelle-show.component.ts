import { PasserelleService } from "./../passerelle.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { AmbassadeService } from "../../ambassade/ambassade.service";

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
  ambassade: any;
  constructor(
    public passerelleService: PasserelleService,
    public route: ActivatedRoute,
    public router: Router,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService
  ) {
    super(passerelleService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.ministere = ministere;
          console.log("ministere");
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.ambassade = ambassade;
        });
    }
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
