import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CitoyenService } from "src/app/zental/citoyen/citoyen.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DiscussionService } from "../../../discussion/discussion/discussion.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { TolobaEntiteDiplomatiqueService } from "../../../toloba-entite-diplomatique/toloba-entite-diplomatique.service";

@Component({
  selector: "app-votre-diaspora",
  templateUrl: "./votre-diaspora.component.html",
  styleUrls: ["./votre-diaspora.component.scss"],
})
export class VotreDiasporaComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @Input() parent: ParentDefinition;
  searchActive: boolean;
  discussionLoading = false;
  @ViewChild("search") searchField: ElementRef;

  // Au cas on serait dans toloba entite diplomatique
  serviceCommunication: any;
  entite_diplomatique: any;

  constructor(
    public citoyenService: CitoyenService,
    public router: Router,
    public route: ActivatedRoute,
    public discussionService: DiscussionService,
    public tolobaService: TolobaEntiteDiplomatiqueService
  ) {
    super(citoyenService);
  }

  ngOnInit(): void {
    if (this.parent.name === "entite_diplomatique") {
      this._subscription["serviceCommunication"] =
        this.tolobaService.serviceCommunication$.subscribe((service) => {
          this.serviceCommunication = service;
        });

      this._subscription["entite_diplomatique"] =
        this.tolobaService.entite_diplomatique$.subscribe(
          (entiteDiplomatique) => {
            this.entite_diplomatique = entiteDiplomatique;
          }
        );
    }

    this.route.queryParams.subscribe((params) => {
      if (params.menu === "votre-diaspora") {
        this.getData(params);
      }
    });
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchActive = !!params.search;

      if (params.search) {
        if (!this.searchField?.nativeElement?.value) {
          this.searchField.nativeElement.value = params.search;
        }
      }
    });
  }

  // GEt all the data from the server
  getData(params: Params): void {
    if (this.parent.name === "user") {
      const userInscriptionConsulaire = this.auth.user.inscription_consulaire;

      if (userInscriptionConsulaire?.type_entite_diplomatique === 1) {
        this.getByAmbassade(userInscriptionConsulaire?.ambassade?.id, params);
      } else if (userInscriptionConsulaire?.type_entite_diplomatique === 2) {
        this.getByConsulat(userInscriptionConsulaire?.consulat?.id, params);
      } else if (userInscriptionConsulaire?.type_entite_diplomatique === 3) {
        this.getByLiaison(userInscriptionConsulaire?.liaison?.id, params);
      }
    } else if (this.parent.name === "entite_diplomatique") {
      if (this.entite_diplomatique.name === "ministere") {
        this.getByPays(
          this.entite_diplomatique.item.entite_diplomatique.pays_origine.id,
          params
        );
      } else if (this.entite_diplomatique.name === "ambassade") {
        this.getByAmbassade(this.parent.item.id, params);
      } else if (this.entite_diplomatique.name === "consulat") {
        this.getByConsulat(this.parent.item.id, params);
      } else if (this.entite_diplomatique.name === "liaison") {
        this.getByLiaison(this.parent.item.id, params);
      }
    }
  }

  getDiscussion(user: number) {
    let discussionParams: { type: number; id: number };
    if (this.parent.name === "user") {
      discussionParams = { type: 1, id: this.auth.user.id_inscription };
    } else if (this.parent.name === "entite_diplomatique") {
      discussionParams = { type: 2, id: this.serviceCommunication.id };
    }

    this.discussionLoading = true;
    this.discussionService
      .check(discussionParams.type, user, discussionParams.id)
      .subscribe((discussion) => {
        this.router.navigate([this.getUrlRedirection(discussion.id)], {
          queryParamsHandling: "preserve",
        });

        this.discussionLoading = false;
      });
  }

  getUrlRedirection(discussion: number): string {
    let urlRedirection: string;
    if (this.parent.name === "user") {
      urlRedirection = `/toloba/discussion/${discussion}`;
    } else if (this.parent.name === "entite_diplomatique") {
      const fullUrlWithoutQueryParams = this.router.url.split("?")[0];
      urlRedirection = `${fullUrlWithoutQueryParams}/discussion/${discussion}`;
    }

    return urlRedirection;
  }

  // Chercher
  research(keyword: string) {
    if (keyword) {
      this.router.navigate(["./"], {
        relativeTo: this.route,
        queryParams: { search: keyword },
        queryParamsHandling: "merge",
      });
    }
  }

  // get by Pays
  getByPays(pays: number, params: Params) {
    this.loading = true;
    this.citoyenService.getByPays(pays, params, false).subscribe((response) => {
      this.data = response.filter(
        (item) => item.id_inscription !== this.auth.user.id_inscription
      );
      this.loading = false;
    });
  }

  // get Liaison
  getByLiaison(liaison: number, params: Params) {
    this.loading = true;
    this.citoyenService
      .getByLiaison(liaison, params, false)
      .subscribe((response) => {
        this.data = response.filter(
          (item) => item.id_inscription !== this.auth.user.id_inscription
        );
        this.loading = false;
      });
  }

  // Consulat
  getByConsulat(consulat: number, params: Params) {
    this.loading = true;
    this.citoyenService
      .getByConsulat(consulat, params, false)
      .subscribe((response) => {
        this.data = response.filter(
          (item) => item.id_inscription !== this.auth.user.id_inscription
        );
        this.loading = false;
      });
  }

  // get Ambassade
  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.citoyenService
      .getByAmbassade(ambassade, params, false)
      .subscribe((response) => {
        this.data = response.filter(
          (item) => item.id_inscription !== this.auth.user.id_inscription
        );
        this.loading = false;
      });
  }
}
