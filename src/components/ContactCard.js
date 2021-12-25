import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <div className="right floated">
        <Link to={`/contacts/${id}/delete`} state={{ contact: props.contact }}>
          <i
            className="trash alternate outline icon red"
            style={{ marginTop: "7px" }}
          />
        </Link>
      </div>
      <i className="large github middle aligned icon"></i>
      <div className="content">
        <Link to={`/contacts/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
