import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Injectable } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";

declare var $;

@Injectable({
  providedIn: "root",
})
export class Helper {
  public booleanReponse = ["OUI", "NON"];

  constructor(
    // public toastr: ToastrManager,
    private translate: TranslateService,
    private router: Router,
    private _ngxPicaService: NgxPicaService,
    private _route: ActivatedRoute
  ) {}

  navigate(path: string, params?: any): void {
    if (params) {
      this.router.navigate([path, params]);
    } else {
      this.router.navigate([path], { relativeTo: this._route });
    }
  }

  toggleModal(id: string): void {
    $("#" + id).modal("toggle");
  }

  idExtractor(data: any[], idField: string = "id"): number[] {
    let returned: number[] = [];
    data.forEach((element) => {
      returned.push(element[idField]);
    });
    return returned;
  }

  alertSuccess(word: string = "effectueAvecSucces"): void {
    const options = {
      // position: 'top-end',
      type: "success",
      title: this.getTranslation(word),
      showConfirmButton: false,
      timer: 4000,
    };

    Swal.fire({
      ...options,
    });
  }

  alertDanger(word: string = "ERREUR"): void {
    const options = {
      // position: 'top-end',
      type: "error",
      title: this.getTranslation(word),
      showConfirmButton: false,
      timer: 1500,
    };

    Swal.fire({ ...options });
  }

  toastSuccess(word: string = "effectueAvecSucces"): void {
    // this.toastr.successToastr(this.getTranslation(word));
  }

  toastDanger(word: string = "ERREUR"): void {
    // this.toastr.errorToastr(this.getTranslation(word));
  }

  getTranslation(word: string): string {
    let translatedWord: string;
    this.translate.get(word).subscribe((value) => {
      translatedWord = value;
    });
    return translatedWord;
  }

  alertConfirmation(callback: Function) {
    const options = {
      title: this.getTranslation("etesVousSur"),
      // text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getTranslation("OUI"),
      cancelButtonText: this.getTranslation("nonQuitter"),
    };

    Swal.fire({ ...options }).then((result) => {
      if (result.value) {
        callback();
      }
    });
  }

  unsubscribe(subscriptions: any) {
    Object.keys(subscriptions).forEach((key) => {
      if (subscriptions[key]) {
        subscriptions[key].unsubscribe();
      }
    });
  }

  // Permet d'afficher un nombre bien defini de caractere dans un texte
  strcut(text: string, wordCount: number) {
    // if text's length lower than wordCound(nbre of word we want), simply return the text
    if (text.length < wordCount) {
      return text;
    }

    // Else if text's length greater than wordCount, return the cutted text with three dots wich is mean text's cutted before the end
    return `${text.substring(0, wordCount)}...`;
  }

  omitFieldInObject(obj: {}, omitKeys: string[]) {
    return Object.keys(obj).reduce((result, key) => {
      if (!omitKeys.includes(key)) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }

  omitNullValueInObject(obj: {}) {
    let newObject = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] && obj[key] !== "null") {
        newObject[key] = obj[key];
      }
    });

    return newObject;
  }

  parseInt(num: string) {
    return parseInt(num);
  }

  findIndexItemInArray(array: any[], id: number, libelleID: string = "id") {
    return array.findIndex((element) => {
      return element[libelleID] == id;
    });
  }

  deleteItemInArrayByID(
    array: any[],
    idItem: number,
    libelleID: string = "id"
  ) {
    return array.filter((item) => item[libelleID] != idItem);
  }

  rechercher(data: any[], field: string, value: string) {
    return data.find((item) => item[field] == value);
  }

  checkIfUrlHasItem(route: ActivatedRouteSnapshot, item: string): boolean {
    const url = route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join("/"))
      .filter((item) => item);

    return url.includes(item);
  }

  checkExtension(filename: string, extension: any): boolean {
    if (filename.match(extension + "$")) {
      return true;
    }
    return false;
  }

  checkExtensions(filename: string, extensions: string[]): boolean {
    for (let extension of extensions) {
      if (this.checkExtension(filename, extension)) return true;
    }
    return false;
  }

  urlify(text: string) {
    const urlRegex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    if (text) {
      return text.replace(
        urlRegex,
        (url: string) => '<a href="' + url + '">' + url + "</a>"
      );
    } else {
      return text;
    }
  }
}
