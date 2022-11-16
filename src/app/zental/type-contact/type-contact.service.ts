import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TypeContactService extends BaseService {
  constructor() {
    super("contacts/types");
  }
}
