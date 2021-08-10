import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class RelationInterpersonnelleService extends BaseService {
  constructor() {
    super("relations/personnes");
  }
}
