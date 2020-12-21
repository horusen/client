import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MesTachesService } from "../mes-taches.service";

@Component({
  selector: "app-mes-taches-list",
  templateUrl: "./mes-taches-list.component.html",
  styleUrls: ["./mes-taches-list.component.scss"],
})
export class MesTachesListComponent extends BaseComponent implements OnInit {
  constructor(
    public mesTachesService: MesTachesService,
    public route: ActivatedRoute
  ) {
    super(mesTachesService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getByFiltre(this.helper.urlParamsToObject(params));
    });
  }

  // fromQueryParamstoArray(query: Object) {
  //   let returnedObject = {};
  //   Object.keys(query).forEach(key => {
  //     returnedObject[key] = q
  //   })
  // }

  // Get data sans filtre
  get() {
    this.loading = true;
    this.mesTachesService.get().subscribe(() => {
      this.loading = false;
    });
  }

  getByFiltre(filtres: object) {
    this.loading = true;
    this.mesTachesService.getByFiltre(filtres).subscribe(() => {
      this.loading = false;
    });
  }
}
