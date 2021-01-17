import { Injectable } from "@angular/core";
import { Contact } from "../models/contact";

import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  fetchContacts(sortType: String, sortOrder: String): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts/${sortType}/${sortOrder}`);
  }

  add(contact: Contact): Observable<any> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact);
  }

  save(contact: Contact): Observable<any> {
    return this.http.put<Contact>(
      `${this.apiUrl}/contacts/${contact._id}`, 
      contact
    );
  }

  delete(contact: Contact) {
    return this.http.delete<Contact>(`${this.apiUrl}/contacts/${contact._id}`);
  }
}
