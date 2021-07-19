import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Container from "../Container/Container";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import contactsList from "../data/contacts.json";

// function componentLocalStorageMount = () => {
//   const contact = localStorage.getItem("contacts");
//   const parsedContact = JSON.parse(contact);

//   if (parsedContact) {
//     this.setState({ contacts: parsedContact });
//   }

//     const componentDidUpdate(prevState) {
//   const contact = JSON.stringify(contacts);
//   if (contact !== prevState.contacts) {
//     localStorage.setItem("contacts", contact);
//   }
// }
// }

function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", contactsList);
  const [filter, setFilter] = useState("");

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };

    if (contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Container>
    </>
  );
}
