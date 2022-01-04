import { SearchHOC } from "./SearchHOC";

const UserList = ({ data }) => {
  const renderUsersList = data.map((user) => {
    return <li key={user.id}>{user.name}</li>;
  });

  return (
    <div>
      <ul>{renderUsersList}</ul>
    </div>
  );
};

const SearchUsers = SearchHOC(UserList, "users");

export default SearchUsers;
