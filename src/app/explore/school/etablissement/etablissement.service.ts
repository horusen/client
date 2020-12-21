import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class EtablissementService extends BaseService {
  constructor() {
    super("etablissement");
  }

  get etablissement() {
    return JSON.parse(localStorage.getItem("etablissement"));
  }
}
