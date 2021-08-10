import { MinistereService } from "./../../ministere/ministere.service";
import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { BureauService } from "../bureau.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AmbassadeService } from "../../ambassade/ambassade.service";

@Component({
  selector: "app-bureau-show",
  templateUrl: "./bureau-show.component.html",
  styleUrls: ["./bureau-show.component.scss"],
})
export class BureauShowComponent extends BaseSingleComponent implements OnInit {
  affecter = false;
  edit = false;
  ministere: any;
  ambassade: any;
  constructor(
    public bureauService: BureauService,
    public route: ActivatedRoute,
    public router: Router,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService
  ) {
    super(bureauService, route);
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

  affecterBureau(): void {
    this.affecter = true;
    this.helper.toggleModal("affecter-bureau-modal");
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.bureauService.delete(this.single.id).subscribe(() => {
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
    this.helper.toggleModal("bureau-edit-modal");
  }

  onBureauEdit(bureau: any): void {
    this.single = bureau;
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
    this.helper.toggleModal("bureau-edit-modal");
  }
}
