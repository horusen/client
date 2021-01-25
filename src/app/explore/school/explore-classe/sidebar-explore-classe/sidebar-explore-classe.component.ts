import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-sidebar-explore-classe",
  templateUrl: "./sidebar-explore-classe.component.html",
  styleUrls: ["./sidebar-explore-classe.component.scss"],
})
export class SidebarExploreClasseComponent implements OnInit, OnDestroy {
  etablissement: any;
  etablissementSubscription: Subscription
  showHierarchieExterne: boolean = false;
  loading: boolean = false;
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.etablissementSubscription =  this.etablissementService.singleData$.subscribe(etablissement => this.etablissement = etablissement);

    this.router.url.includes("affilie=false")
      ? (this.showHierarchieExterne = true)
      : (this.showHierarchieExterne = false);

  }

  ngOnDestroy() {
    this.etablissementSubscription.unsubscribe();
  }

}
