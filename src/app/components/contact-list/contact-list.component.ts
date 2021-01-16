import { Component, OnDestroy, OnInit } from "@angular/core";

import { Contact } from "src/app/models/contact";
import { ContactService } from "../../services/contact.service";
import { ContactComponent } from "../contact/contact.component";

import { take } from "rxjs/operators";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: "0" }),
        animate(".3s ease-in", style({ opacity: "1" })),
      ]),
    ]),
  ],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  sortType: String;
  sortOrder: String;

  constructor(private contactService: ContactService) {
    this.sortType = "name";
    this.sortOrder = "desc";
    this.contacts = [];
  }

  ngOnInit() {
    this.fetchContacts();
  }

  changed(variable, val) {
    if (variable === "sortOrder") this.sortOrder = val.value;
    if (variable === "sortType") this.sortType = val.value;
    this.fetchContacts();
  }

  get canEditOrAdd() {
    if (!this.contacts) return true;
    for (let c of this.contacts) {
      if (c.editing) return false;
    }
    return true;
  }

  fetchContacts() {
    this.contactService
      .fetchContacts(this.sortType, this.sortOrder)
      .pipe(take(1))
      .subscribe((value) => {
        if (JSON.stringify(this.contacts) !== JSON.stringify(value))
          this.contacts = value;
      });
  }

  add() {
    this.contactService
      .add({
        name: "",
        address: "",
        phone: "",
        email: "",
        id: Math.round(Math.random() * 500000),
        editing: true,
      })
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.fetchContacts();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  save(contact: Contact) {
    this.contactService
      .save(contact)
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.fetchContacts();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  delete(contact: Contact) {
    this.contactService
      .delete(contact)
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.fetchContacts();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
