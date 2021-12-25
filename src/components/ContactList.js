import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const renderContactList = props.contacts.map((contact) => {
    return <ContactCard contact={contact} key={contact.id} />;
  });

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
