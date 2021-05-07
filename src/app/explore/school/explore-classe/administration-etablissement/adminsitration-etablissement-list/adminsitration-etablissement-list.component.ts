import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";

@Component({
  selector: "app-adminsitration-etablissement-list",
  templateUrl: "./adminsitration-etablissement-list.component.html",
  styleUrls: ["./adminsitration-etablissement-list.component.scss"],
})
export class AdminsitrationEtablissementListComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  addEtablissement: boolean = false;
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment == "create-etablissement") {
        this.addEtablissement = true;
        this.helper.toggleModal("etablissement-create-modal");
      }
    });
  }

  getData(): void {
    this.loading = true;
    this.etablissementService
      .getEtablissementsWhereUserIsAdminOrChargerCom()
      .subscribe(() => {
        this.loading = false;
      });
  }
}
