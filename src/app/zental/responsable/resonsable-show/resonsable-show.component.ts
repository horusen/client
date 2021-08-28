import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";

@Component({
  selector: "app-resonsable-show",
  templateUrl: "./resonsable-show.component.html",
  styleUrls: ["./resonsable-show.component.scss"],
})
export class ResonsableShowComponent implements OnInit {
  @Input() responsable: {
    item: any;
    name: string;
    institution: any;
    institutionName: string;
  };
  constructor() {}

  ngOnInit(): void {
    console.log(this.responsable);
  }
}
