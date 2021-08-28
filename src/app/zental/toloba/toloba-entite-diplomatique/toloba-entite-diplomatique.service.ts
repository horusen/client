import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TolobaEntiteDiplomatiqueService {
  entite_diplomatique$ = new ReplaySubject<any>(1);
  serviceCommunication$ = new ReplaySubject<any>(1);

  constructor() {}
}
