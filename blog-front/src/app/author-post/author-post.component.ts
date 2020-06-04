import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-author-post",
  templateUrl: "./author-post.component.html",
  styleUrls: ["./author-post.component.css"]
})
export class AuthorPostComponent implements OnInit {
  public processing: boolean = false;
  public submitted: boolean = false;
  public success: boolean = false;
  public failure: boolean = false;


  ngOnInit() {
  }

}
