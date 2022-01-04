import { useUserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserContext();

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="ui center aligned dividing header">
      <h2>Contact Manager</h2>
      <hr />
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/users">
          <li>Users</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
      </ul>
      <h3>{user.username}</h3>
      {!user.isGuestUser && (
        <button className="ui button blue" onClick={handleLogOut}>
          Log out
        </button>
      )}
    </div>
  );
};

export default Header;
