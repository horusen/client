import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-groupe-solo",
  templateUrl: "./groupe-solo.component.html",
  styleUrls: ["./groupe-solo.component.scss"],
})
export class GroupeSoloComponent implements OnInit {
  @Input() groupe: any;
  constructor() {}

  ngOnInit(): void {}
}
