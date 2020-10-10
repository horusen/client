import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class NiveauDifficulteClasseService extends BaseService {
  constructor() {
    super("niveau-difficulte/classe");
  }
}
