import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-personal-assets",
  templateUrl: "./personal-assets.component.html",
  styleUrls: ["./personal-assets.component.scss"],
})
export class PersonalAssetsComponent implements OnInit {
  activeComponent = {
    professeur: false,
    classe: false,
    groupe: true,
    sousReseaux: false,
  };
  constructor() {}

  ngOnInit(): void {}

  resetComponent() {
    Object.keys(this.activeComponent).forEach((key) => {
      this.activeComponent[key] = false;
    });
  }

  activateComponent(component: string) {
    if (this.activeComponent.hasOwnProperty(component)) {
      this.resetComponent();
      this.activeComponent[component] = true;
    }
  }
}
