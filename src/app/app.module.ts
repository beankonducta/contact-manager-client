import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ContactListComponent } from "./components/contact-list/contact-list.component";

@NgModule({
  declarations: [AppComponent, ContactComponent, ContactListComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
