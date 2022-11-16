import { Injectable } from "@angular/core";
import { FileHandler } from "./file-handler";
import { Helper } from "./helper";

@Injectable({
  providedIn: "root",
})
export class DocumentHandlerService extends FileHandler {
  public acceptedDocumentExtension = ["pdf", "PDF"];

  constructor(private _helper: Helper) {
    super(_helper);
  }

  // Check if an image has correct extension and correct size
  checkDocument(file: File): boolean {
    return this.checkFile(file, this.acceptedDocumentExtension);
  }
}
