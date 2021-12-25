import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import DeleteContact from "./components/DeleteContact";

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
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={contacts} />} />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route
            path="/contacts/:id/delete"
            element={
              <DeleteContact deleteContactHandler={removeContactHandler} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
