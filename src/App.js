import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
// import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import DeleteContact from "./components/DeleteContact";
import EditContact from "./components/EditContact";
import Login from "./components/Login";
import { userContext, UserContextProvider } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchUsers from "./components/UserList";
import SearchContacts from "./components/ContactList";

const BASE_URL = "http://localhost:3004";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async function () {
    const response = await fetch(BASE_URL + "/contacts").then((response) =>
      response.json()
    );
    return response;
  };

  const addContactHandler = async (contact) => {
    const request = { id: uuidv4(), ...contact };
    const response = await fetch(BASE_URL + "/contacts", {
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
    setContacts([...contacts, response]);
  };

  const removeContactHandler = async (id) => {
    await fetch(BASE_URL + "/contacts/" + id, {
      method: "DELETE",
    });
    const newContactsList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactsList);
  };

  const updateContactHandler = async (contact) => {
    const response = await fetch(BASE_URL + "/contacts/" + contact.id, {
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((response) => response.json());

    setContacts(
      contacts.map((contact) =>
        contact.id === response.id ? { ...response } : contact
      )
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactsList = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        // Object.values(contact)
        //   .join(" ")
        //   .toLowerCase()
        //   .includes(searchTerm.toLowerCase())
      );
      setSearchResults(newContactsList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui main container">
      <Router>
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <SearchContacts />
                  // <ContactList
                  //   contacts={searchTerm.length < 1 ? contacts : searchResults}
                  //   term={searchTerm}
                  //   searchKeyword={searchHandler}
                  // />
                }
              />
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
              <Route
                path="/contacts/:id/edit"
                element={
                  <EditContact updateContactHandler={updateContactHandler} />
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<SearchUsers />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
