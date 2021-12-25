import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";

const LOCAL_STORAGE_KEY = "ContactApp.contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedContacts) setContacts(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui main container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
