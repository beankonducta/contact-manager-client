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

  constructor() {
  }

  ngOnInit(): void { }

  get valid() {
    if (!this.contact) return false;
    if (!this.nameValid || !this.addressValid || !this.emailValid || !this.phoneValid) return false;
    return true;
  }

  get nameValid() {
    if(!this.contact.name) return false;
    return this.contact.name.length > 4;
  }

  get addressValid() {
    if(!this.contact.address) return false;
    return this.contact.address.length > 5;
  }

  get emailValid() {
    if(!this.contact.email) return false;
    return this.contact.email.match(/^\S+@\S+\.\S+$/);
  }

  get phoneValid() {
    if(!this.contact.phone) return false;
    return this.contact.phone.match(/\d/g) && this.contact.phone.length >= 10;
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
