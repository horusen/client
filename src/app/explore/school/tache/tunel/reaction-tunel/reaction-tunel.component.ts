import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ReactionService } from "../../../reaction/reaction.service";
import { TunelService } from "../tunel.service";

@Component({
  selector: "app-reaction-tunel",
  templateUrl: "./reaction-tunel.component.html",
  styleUrls: ["./reaction-tunel.component.scss"],
})
export class ReactionTunelComponent extends BaseComponent implements OnInit {
  tunel: any;
  participerLoading: boolean = false;
  urlQueryParams: {};
  showTabs = {
    message: false,
    participant: false,
    fichier: false,
  };
  constructor(
    public tunelService: TunelService,
    public reactionService: ReactionService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Tunel
      if (params["tunel"]) {
        // Permet d'eviter de recuperer un tunel deux fois de suite
        +params["tunel"] !== this.tunelService.singleData?.id
          ? this.tunelService.getSingle(params["tunel"]).subscribe()
          : null;
      } else {
        this.router.navigate(["./"]);
        this.helper.hideModal("discussion-min-modal");
      }

      // Tab handler
      if (params["tab"]) {
        this.displayTab(params["tab"]);
      } else if (
        !params["tab"] &&
        params["type_discussion"] === "tunel" &&
        params["modal"] === "discussion-min"
      ) {
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParams: { ...params, tab: "message" },
        });
      }

      this.urlQueryParams = params;
    });

    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.tunel = tunel;
      }
    );
  }

  ngAfterViewInit() {
    this.helper.showModal("discussion-min-modal");
  }

  resetShowTabs() {
    Object.keys(this.showTabs).forEach((key) => {
      this.showTabs[key] = false;
    });
  }

  displayTab(tab: string) {
    if (Object.keys(this.showTabs).includes(tab)) {
      this.resetShowTabs();
      this.showTabs[tab] = true;
    }
  }

  participer() {
    // this.helper.alertConfirmation(() => {
    //   this.participerLoading = true;
    //   this.participantTunelService.participer(this.tunel.id).subscribe(() => {
    //     this.loading = false;
    //   });
    // });
  }

  getNavigationQueryParamsByTab(tab: string) {
    return {
      ...this.helper.omitFieldInObject(this.urlQueryParams, ["tab"]),
      tab,
    };
  }
}
