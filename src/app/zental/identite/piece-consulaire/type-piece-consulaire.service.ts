import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TypePieceConsulaireService extends BaseService {
  constructor() {
    super("types-pieces-consulaires");
  }
}
