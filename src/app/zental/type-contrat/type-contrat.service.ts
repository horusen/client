import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TypeContratService extends BaseService {
  constructor() {
    super("type-contrats");
  }
}
