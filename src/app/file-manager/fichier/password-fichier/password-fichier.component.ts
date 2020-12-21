import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { PasswordFichierService } from "./password-fichier.service";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-password-fichier",
  templateUrl: "./password-fichier.component.html",
  styleUrls: ["./password-fichier.component.scss"],
})
export class PasswordFichierComponent implements OnInit {
  loading: boolean = false;
  fichier: any;
  fichierSubscription: Subscription;
  activeComponents = {
    add: false,
    check: false,
    edit: false,
    delete: false,
  };
  constructor(
    public passwordFichierService: PasswordFichierService,
    public helper: Helper
  ) {}

  ngOnInit(): void {
    this.fichierSubscription = this.passwordFichierService.processPassword$.subscribe(
      (elements) => {
        this.fichier = elements.fichier;
        this.activateComponent(elements.typeProcess);
      }
    );
  }

  resetActiveComponents() {
    Object.keys(this.activeComponents).forEach((key) => {
      this.activeComponents[key] = false;
    });
  }

  activateComponent(component: string) {
    this.resetActiveComponents();
    this.activeComponents[component] = true;
  }

  done() {
    this.resetActiveComponents();
    this.helper.toggleModal("password-fichier-modal");
  }
}
