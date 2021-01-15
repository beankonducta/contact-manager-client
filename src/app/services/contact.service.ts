import { Injectable } from "@angular/core";
import { Contact } from "../models/contact";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor() {}

  add(contact: Contact) {}

  save(contact: Contact) {}

  delete(contact: Contact) {}
}
