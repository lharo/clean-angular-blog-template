import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-preview-post",
  templateUrl: "./preview-post.component.html",
  styleUrls: ["./preview-post.component.css"]
})
export class PreviewPostComponent implements OnInit {

  constructor(private router: Router) {}
  ngOnInit() {}

  public go(): void {
  }
}
