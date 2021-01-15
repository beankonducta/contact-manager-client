import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Contact } from "src/app/models/contact";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  @Output() onSave: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() onDelete: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() {}

  ngOnInit(): void {}

  save() {
    this.contact.editing = false;
    this.onSave.emit(this.contact);
  }

  edit() {
    this.contact.editing = true;
  }

  delete() {
    this.onDelete.emit(this.contact);
  }
}
