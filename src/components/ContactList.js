import { SearchHOC } from "./SearchHOC";
import ContactCard from "./ContactCard";

const ContactList = ({ data }) => {
  const renderContactList = data.map((contact) => {
    return <ContactCard contact={contact} key={contact.id} />;
  });

  return (
    <>
      {renderContactList.length > 0
        ? renderContactList
        : "No contacts available"}
    </>
  );
};

const SearchContacts = SearchHOC(ContactList, "comments");

export default SearchContacts;
