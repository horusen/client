import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { BaseComponent } from "./base.component";
import { BaseService } from "../../services/base.service";
import { AppInjector } from "../../services/app-injector.service";

@Component({
  selector: "",
  template: "",
  styles: [],
})
export class BaseSingleComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  id: number;
  single: any;
  public enableSubscribeToSingleData: boolean = true;
  public enableFetchDataFromURL: boolean = false;

  protected route: ActivatedRoute;

  constructor(public service: BaseService) {
    super(service);
    this.route = AppInjector.injector.get(ActivatedRoute);
  }

  ngOnInit() {
    if (this.enableFetchDataFromURL) {
      this.route.params.subscribe((param) => {
        this.id = param.id;
        this.service.getSingle(this.id).subscribe();
      });
    }

    if (this.enableSubscribeToSingleData) {
      this._subscription["single"] = this.service.singleData$.subscribe(
        (single) => (this.single = single)
      );
    }
  }
}
