import { Component, OnDestroy } from "@angular/core";
import { AppInjector } from "../../services/app-injector.service";
import { BaseService } from "../../services/base.service";
import { Helper } from "../../services/helper";

@Component({
  selector: "",
  template: "",
  styles: [],
})
export class BaseComponent implements OnDestroy {
  public currentPage = 1; // Pour la pagination
  public loading: boolean = false;
  public data: any[] = []
  public _subscription = {};

  protected helper: Helper;

  constructor(protected service: BaseService) {
    this.helper = AppInjector.injector.get(Helper);
  }

  /* ONDESTROY */
  ngOnDestroy(): void {
    this.unsubscribe(this._subscription);
  }

  unsubscribe(subscriptions: {}) {
    Object.keys(subscriptions).forEach((_subscription) => {
      if (subscriptions[_subscription]) {
        subscriptions[_subscription].unsubscribe();
      }
    });
  }
}
