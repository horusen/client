import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { AffectationTacheService } from "../affectation-tache/affectation-tache.service";

@Injectable({
  providedIn: "root",
})
export class SolutionTacheService extends BaseService {
  autresSolutions: any[] = [];
  constructor(public affectationTacheService: AffectationTacheService) {
    super("tache/solution");
  }

  getByTache(affectationTache: number) {
    return this.factory
      .get(`tache/${affectationTache}/solution`)
      .pipe(tap(this.listResponseHandler()));
  }

  getAutresSolutions(tache: number) {
    return this.factory.get(`tache/${tache}/solution/autres`).pipe(
      tap({
        next: (data) => {
          this.autresSolutions = data;
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getByProfesseur() {
    return this.factory
      .get(`${this.endPoint}/by-professeur`)
      .pipe(tap(this.listResponseHandler()));
  }

  add(elements: any) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(response);

          this.affectationTacheService.singleData.has_solution = true;
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
