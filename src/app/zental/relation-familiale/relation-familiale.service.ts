import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class RelationFamilialeService extends BaseService {
  constructor() {
    super("relations-familiales");
  }

  getByUserByType(user: number, typeMembreFamille: string): Observable<any> {
    return this.factory.get(
      `users/${user}/${this.endPoint}/${typeMembreFamille}`
    );
  }

  getByUserByTypeList(
    user: number,
    typeMembreFamille: string
  ): Observable<any> {
    return this.factory.get(
      `users/${user}/${this.endPoint}/${typeMembreFamille}/list`
    );
  }
}
