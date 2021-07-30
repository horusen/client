import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BaseComponent } from "./base.component";
import { BaseService } from "../../services/base.service";

@Component({
  selector: "",
  template: "",
  styles: [],
})
export class BaseSingleComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  id: number;
  single: any;
  public enableSubscribeToSingleData: boolean = true;
  public enableEmitLoading: boolean = false;
  public enableSubscribeToLoading: boolean = false;
  public enableFetchDataFromURL: boolean = false;

  constructor(public service: BaseService, public route?: ActivatedRoute) {
    super(service);
  }

  ngOnInit() {
    if (this.enableFetchDataFromURL) {
      this.getSingle(this.route);
    }

    if (this.enableSubscribeToSingleData) {
      this._subscription["single"] = this.service.singleData$.subscribe(
        (single) => {
          this.single = single;
        }
      );
    }

    if (this.enableSubscribeToLoading) {
      this._subscription["loading"] = this.service.loading$.subscribe(
        (loading) => {
          this.loading = loading;
        }
      );
    }
  }

  getSingle(route: ActivatedRoute) {
    route.params.subscribe((param) => {
      if (this.enableEmitLoading) this.service.loading = true;
      this.loading = true;
      this.id = this.helper.parseInt(param["id"]);
      this.service.getSingle(this.id).subscribe(() => {
        this.loading = false;
        if (this.enableEmitLoading) this.service.loading = false;
      });
    });
  }
}
