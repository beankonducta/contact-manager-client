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

  adding: boolean;

  constructor(private contactService: ContactService) {
    this.adding = false;
  }

  ngOnInit() {
    this.fetchContacts();
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
    this.adding = true;
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
    this.adding = false;
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
    this.adding = false;
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
