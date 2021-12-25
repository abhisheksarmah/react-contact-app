import { Link, useLocation } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation();
  const { name, email } = location.state.contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src="https://picsum.photos/200/200" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="ui centered">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
