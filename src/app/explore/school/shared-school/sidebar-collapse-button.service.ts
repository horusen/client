import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarCollapseButtonService {
  collapsed$ = new Subject<boolean>();
  constructor() {}
}
