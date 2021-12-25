const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <div className="right floated">
        <i
          className="trash alternate outline icon red"
          style={{ marginTop: "7px" }}
          onClick={() => props.clickHandler(id)}
        />
      </div>
      <i className="large github middle aligned icon"></i>
      <div className="content">
        <div className="header">{name}</div>
        <div className="description">{email}</div>
      </div>
    </div>
  );
};

export default ContactCard;
