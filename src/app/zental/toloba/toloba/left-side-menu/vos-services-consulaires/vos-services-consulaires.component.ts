import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ServiceService } from "src/app/zental/service/service.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { TolobaEntiteDiplomatiqueService } from "../../../toloba-entite-diplomatique/toloba-entite-diplomatique.service";
import { DiscussionService } from "../../../discussion/discussion/discussion.service";

@Component({
  selector: "app-vos-services-consulaires",
  templateUrl: "./vos-services-consulaires.component.html",
  styleUrls: ["./vos-services-consulaires.component.scss"],
})
export class VosServicesConsulairesComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @Input() parent: ParentDefinition;
  typeEntiteDiplomatique: any;
  searchActive: boolean;
  serviceCommunicationEntiteDiplomatique: any;
  discussionLoading = false;
  @ViewChild("search") searchField: ElementRef;

  constructor(
    public serviceService: ServiceService,
    public tolobaService: TolobaEntiteDiplomatiqueService,
    public discussionService: DiscussionService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    if (this.parent.name === "entite_diplomatique") {
      this._subscription["type_entite_diplomatique"] =
        this.tolobaService.entite_diplomatique$.subscribe(
          (entiteDiplomatique) => {
            this.typeEntiteDiplomatique = entiteDiplomatique.name;
          }
        );

      this._subscription["serviceCommunicationEntiteDiplomatique"] =
        this.tolobaService.serviceCommunication$.subscribe(
          (service) => (this.serviceCommunicationEntiteDiplomatique = service)
        );
    }

    this.route.queryParams.subscribe((params) => {
      if (params.menu === "vos-services-consulaires") {
        if (this.parent.name === "user") {
          this.getDataByUser(params);
        } else if (this.parent.name === "entite_diplomatique") {
          this.getDataByEntiteDiplomatique(
            this.typeEntiteDiplomatique,
            this.parent.item.id,
            params
          );
        }
      }
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchActive = !!params.search;

      if (params.search) {
        if (!this.searchField?.nativeElement?.value) {
          this.searchField.nativeElement.value = params.search;
        }
      }
    });
  }

  getDataByEntiteDiplomatique(
    typeEntiteDiplomatique: string,
    idEntiteDiplomatique: number,
    params: Params
  ): void {
    if (typeEntiteDiplomatique === "ministere") {
      this.getByMinistere(idEntiteDiplomatique, params);
    } else if (typeEntiteDiplomatique === "ambassade") {
      this.getByAmbassade(idEntiteDiplomatique, params);
    } else if (typeEntiteDiplomatique === "consulat") {
      this.getByConsulat(idEntiteDiplomatique, params);
    } else if (typeEntiteDiplomatique === "bureau") {
      this.getByBureau(idEntiteDiplomatique, params);
    }
  }

  getDataByUser(params: Params): void {
    const inscriptionConsulaire = this.auth.user.inscription_consulaire;

    if (inscriptionConsulaire.type_entite_diplomatique === 1) {
      this.getByAmbassade(inscriptionConsulaire.ambassade.id, params);
    } else if (inscriptionConsulaire.type_entite_diplomatique === 2) {
      this.getByConsulat(inscriptionConsulaire.consulat.id, params);
    } else if (inscriptionConsulaire.type_entite_diplomatique === 3) {
      this.getByBureau(inscriptionConsulaire.liaison.bureau.id, params);
    }
  }

  getByAmbassade(ambassade: number, params: Params): void {
    this.loading = true;
    this.serviceService.getByAmbassade(ambassade, params, true).subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.serviceService.getByConsulat(consulat, params, true).subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  getByBureau(bureau: number, params: Params): void {
    this.loading = true;
    this.serviceService.getByBureau(bureau, params, true).subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  getByMinistere(ministere: number, params: Params): void {
    this.loading = true;
    this.serviceService.getByMinistere(ministere, params, true).subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  research(keyword: string) {
    if (keyword) {
      this.router.navigate(["./"], {
        relativeTo: this.route,
        queryParams: { search: keyword },
        queryParamsHandling: "merge",
      });
    }
  }

  getDiscussion(service: number) {
    let discussionParams: { type: number; id: number };
    if (this.parent.name === "user") {
      discussionParams = { type: 2, id: this.auth.user.id_inscription };
    } else if (this.parent.name === "entite_diplomatique") {
      discussionParams = {
        type: 4,
        id: this.serviceCommunicationEntiteDiplomatique.id,
      };
    }

    this.discussionLoading = true;
    this.discussionService
      .check(discussionParams.type, discussionParams.id, service)
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
}
