import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DemandeAdhesionGroupeService } from "src/app/zental/groupe/demande-adhesion-groupe/demande-adhesion-groupe.service";
import { GroupeService } from "src/app/zental/groupe/groupe/groupe.service";
import { DiscussionService } from "../../../discussion/discussion/discussion.service";

@Component({
  selector: "app-vos-groupes",
  templateUrl: "./vos-groupes.component.html",
  styleUrls: ["./vos-groupes.component.scss"],
})
export class VosGroupesComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  searchActive: boolean;
  // si true: le component recupere les groupes dont le user n'est pas membre
  // si false: le component recupere les groupes dont le user est membre
  @Input() autresGroupes = false;
  @ViewChild("search") searchField: ElementRef;
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute,
    public router: Router,
    public discussionService: DiscussionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.menu === "vos-groupes" || params.menu === "autres-groupes") {
        this.getData(params);
      }
    });
  }

  getData(params: Params): void {
    this.autresGroupes
      ? this.getByUserAsNonMembre(this.auth.user.id_inscription, params)
      : this.getByUser(this.auth.user.id_inscription, params);
  }

  getByUser(user: number, params: Params): void {
    this.loading = true;
    this.groupeService.getByUser(user, params, true).subscribe((groupes) => {
      this.loading = false;
    });
  }

  getByUserAsNonMembre(user: number, params: Params): void {
    this.loading = true;
    this.groupeService
      .getByUserAsNonMembre(user, params, true)
      .subscribe((groupes) => {
        this.loading = false;
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

  research(keyword: string) {
    if (keyword) {
      this.router.navigate(["./"], {
        relativeTo: this.route,
        queryParams: { search: keyword },
        queryParamsHandling: "merge",
      });
    }
  }
}
