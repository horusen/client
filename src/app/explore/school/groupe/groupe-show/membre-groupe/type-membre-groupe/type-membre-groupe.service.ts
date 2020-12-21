import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TypeMembreGroupeService extends BaseService {
  constructor() {
    super("groupe/membre/type");
  }
}
