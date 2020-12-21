import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ConfidentialiteService extends BaseService {
  constructor() {
    super("confidentialite");
  }
}
