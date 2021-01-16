import { Component, OnDestroy, OnInit } from "@angular/core";

import { Contact } from "src/app/models/contact";
import { ContactService } from "../../services/contact.service";
import { ContactComponent } from "../contact/contact.component";

import { take } from "rxjs/operators";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.fetchContacts();
  }

  get canEditOrAdd() {
    if (!this.contacts) return true;
    for (let c of this.contacts) {
      if (c.editing) return false;
    }
    return true;
  }

  /*
  TODO: This is laggy on client, I think we need to compare our local list to the 
  servers and make only necessary changes.
  */
  fetchContacts() {
    this.contactService
      .fetchContacts()
      .pipe(take(1))
      .subscribe((value) => {
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
