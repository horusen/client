import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class RelationFamilialeService extends BaseService {
  constructor() {
    super("relations-familiales");
  }
}
