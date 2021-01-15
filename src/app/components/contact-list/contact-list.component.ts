import { Component, OnInit } from "@angular/core";

import { Contact } from "src/app/models/contact";
import { ContactService } from "../../services/contact.service";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts() {
    this.contactService.fetchContacts().subscribe((value) => {
      console.log(value);
      this.contacts = value;
    });
  }

  // probably just add an empty contact which is editable
  add() {
    console.log('add');
  }

  // maybe just id not full contact
  save(contact: Contact) {
    console.log('save');
  }

  // maybe just id not full contact
  delete(contact: Contact) {
    console.log('delete');
  }
}
