import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = (props) => {
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  const navigate = useNavigate();

  const [contact, setContact] = useState({ id, name, email });
  const update = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("All fields are mandatory!!");
      return;
    }
    props.updateContactHandler(contact);
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Update Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
