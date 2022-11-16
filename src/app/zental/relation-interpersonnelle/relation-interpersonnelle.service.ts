import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class RelationInterpersonnelleService extends BaseService {
  constructor() {
    super("relations/personnes");
  }

  getByUser(user: number, params?: Params): Observable<any> {
    return this.factory.get(`users/${user}/${this.endPoint}`, { params }).pipe(
      tap((response) => {
        this.data = response.map((item: any) => this.serializeItem(item, user));
      })
    );
  }

  add(elements: any) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(this.serializeItem(response, elements.user1));
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  serializeItem(item: any, user: number) {
    if (item.user1.id_inscription === user) {
      return {
        id: item.id,
        user: item.user2,
        type_relation: item.type_relation,
      };
    }

    return {
      id: item.id,
      user: item.user1,
      type_relation: item.type_relation,
    };
  }
}
