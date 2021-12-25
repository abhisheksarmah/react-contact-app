import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DeleteContact(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state.contact;

  useEffect(() => {
    const confirmation = prompt(
      "Are you sure you want to delete? Please type YES to confirm."
    );
    if (confirmation === "YES") {
      props.deleteContactHandler(id);
    }
    navigate("/");
  }, []);
  return null;
}
