import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import Container from "../Container/Container";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import contactsList from "../data/contacts.json";

class App extends Component {
  state = {
    contacts: contactsList,
    filter: "",
    name: "",
    number: "",
  };

  componentDidMount() {
    const contact = localStorage.getItem("contacts");
    const parsedContact = JSON.parse(contact);

    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }

  componentDidUpdate(prevState) {
    const contact = JSON.stringify(this.state.contacts);
    if (contact !== prevState.contacts) {
      localStorage.setItem("contacts", contact);
    }
  }

  // Возьми свое решение задания из предыдущей домашней работы и добавь хранение контактов телефонной книги в localStorage. Используй методы жизненного цикла.

  // При добавлении и удалении контакта, контакты сохраняются в локальное хранилище.
  // При загрузке приложения, контакты, если таковые есть, считываются из локального хранилища и записываются в состояние.

  changeFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };

    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm contacts={contacts} onSubmit={this.addContact} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Container>
      </>
    );
  }
}

export default App;
