import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ResponsableService } from "src/app/zental/responsable/responsable.service";
import { ConsulatService } from "../../consulat.service";

@Component({
  selector: "app-consul-show",
  templateUrl: "./consul-show.component.html",
  styleUrls: ["./consul-show.component.scss"],
})
export class ConsulShowComponent extends BaseSingleComponent implements OnInit {
  consulat: any;
  constructor(
    public responsableService: ResponsableService,
    public consulatService: ConsulatService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(responsableService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;

    super.ngOnInit();

    this._subscription["consulat"] = this.consulatService.singleData$.subscribe(
      (consulat) => {
        this.consulat = consulat;
        this.getconsul({});
        this.route.params.subscribe((params) => {
          this.getconsul(params);
        });
      }
    );
  }

  edit(): void {
    this.responsableService.singleData = this.single;
  }

  getconsul(params: any): void {
    if (params.id && params?.id != "actuel") {
      this.getByID(params.id);
    } else {
      this.getActuelconsul(this.consulat.id);
    }
  }

  getActuelconsul(consulat: number): void {
    this.loading = true;
    this.responsableService.getByActuelConsule(consulat).subscribe(() => {
      this.loading = false;
    });
  }

  getByID(id: number): void {
    this.loading = true;
    this.responsableService.getSingle(id).subscribe(() => {
      this.loading = false;
    });
  }
}
