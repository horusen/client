import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class InstitutionService {
  private _parent: { name: string; item: any };

  public set parent(v: { name: string; item: any }) {
    this._parent = v;
  }

  public get parent(): { name: string; item: any } {
    return this._parent;
  }

  constructor() {}
}
