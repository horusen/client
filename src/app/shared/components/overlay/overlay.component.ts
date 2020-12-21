import { EventEmitter } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-overlay",
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.scss"],
})
export class OverlayComponent implements OnInit {
  @Output() closed = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closed.emit();
  }
}
