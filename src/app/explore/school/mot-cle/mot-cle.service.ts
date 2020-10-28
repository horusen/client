import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MotCleService extends BaseService {
  constructor() {
    super("mot-cle");
  }
}
