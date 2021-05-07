import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { SolutionTacheService } from "../solution-tache.service";

@Injectable({
  providedIn: "root",
})
export class RemarqueSolutionTacheService extends BaseService {
  constructor(public solutionService: SolutionTacheService) {
    super("tache/solution/remarque");
  }

  getBySolution(solution: number) {
    return this.factory.get(`tache/solution/${solution}/remarque`).pipe(
      tap({
        next: (remarque) => (this.singleData = remarque),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  add(elements: any) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.singleData = response;

          // Update l'affichage de la solution
          this.solutionService.singleData.note = response.note;

          // Update la liste des solutions
          const idxSolution = this.solutionService.findIndexItemInDataByID(
            elements.solution
          );
          if (idxSolution) {
            this.solutionService.data[idxSolution].note = response.note;
          }
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  update(id: number, data: {}) {
    return this.factory.put(`${this.endPoint}/${id}`, data).pipe(
      tap({
        next: (response) => {
          this.updateItemInData(id, response);

          if (this._singleData) {
            this.singleData = response;
          }

          this.solutionService.singleData.note = response.note;

          const idxSolution = this.solutionService.findIndexItemInDataByID(
            this.solutionService.singleData.id
          );
          if (idxSolution) {
            this.solutionService.data[idxSolution].note = response.note;
          }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  delete(id: number) {
    return this.factory.delete(`${this.endPoint}/${id}`).pipe(
      tap({
        next: () => {
          this.deleteItemInData(id);
          this.solutionService.singleData.note = null;

          const idxSolution = this.solutionService.findIndexItemInDataByID(
            this.solutionService.singleData.id
          );
          if (idxSolution) {
            this.solutionService.data[idxSolution].note = null;
          }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
