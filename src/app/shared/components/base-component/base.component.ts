import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AppInjector } from "../../services/app-injector.service";
import { AuthService } from "../../../authentification/auth.service";
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
  public data: any[] = [];
  public _subscription = {};
  public helper: Helper = null;
  public auth: AuthService = null;

  constructor(public service?: BaseService) {
    this.helper = AppInjector.injector.get(Helper);
    this.auth = AppInjector.injector.get(AuthService);
  }

  public dropdownSettings = {
    multi: {
      singleSelection: false,
      idField: "id",
      textField: "libelle",
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    },

    single: {
      singleSelection: true,
      idField: "id",
      textField: "libelle",
      allowSearchFilter: true,
    },
  };

  public dropdownSettingsAlt = {
    single: {
      singleSelection: true,
      labelKey: "libelle",
      enableSearchFilter: true,
      disabled: false,
    },
    singleDisabled: {
      singleSelection: true,
      labelKey: "libelle",
      enableSearchFilter: true,
      disabled: true,
    },
    multi: {
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      labelKey: "libelle",
      enableSearchFilter: true,
    },
    user: {
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: true,
      allowSearchFilter: true,
      disabled: false,
    },
    users: {
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    },
  };

  download(fileID: number) {
    this.service.download(fileID).subscribe();
  }

  /* ONDESTROY */
  ngOnDestroy(): void {
    this.unsubscribe(this._subscription);
  }

  unsubscribe(subscriptions: {}) {
    Object.keys(subscriptions).forEach((_subscription) => {
      if (subscriptions[_subscription] instanceof Subscription) {
        subscriptions[_subscription].unsubscribe();
      }
    });
  }

  supprimer(itemID: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.service.delete(itemID).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }

  modifier(item: any): void {
    this.service.singleData = item;
  }
}
