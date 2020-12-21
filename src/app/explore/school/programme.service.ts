import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ProgrammeService extends BaseService {
  constructor() {
    super("programme");
  }

  getByUserAsProfesseur() {
    return this.factory
      .get(`professeur/programme`)
      .pipe(tap(this.listResponseHandler()));
  }
}
