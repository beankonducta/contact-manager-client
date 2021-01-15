import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Contact } from "src/app/models/contact";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  @Input() canEdit: boolean;
  @Output() onSave: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() onDelete: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() {}

  ngOnInit(): void {}

  // TODO: I should make this a reactive form with real validators, or at least have visual feedback if input is invalid
  get valid() {
    if (!this.contact) return false;
    return (
      this.contact.name.length > 5 &&
      this.contact.email.length > 5 &&
      this.contact.address.length > 5 &&
      this.contact.phone.length > 5
    );
  }

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
