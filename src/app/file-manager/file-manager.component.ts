import { Component, OnInit } from "@angular/core";
import { Helper } from "../shared/services/helper";

@Component({
  selector: "app-file-manager",
  templateUrl: "./file-manager.component.html",
  styleUrls: ["./file-manager.component.scss"],
})
export class FileManagerComponent implements OnInit {
  constructor(public helper: Helper) {}

  ngOnInit(): void {}
}
