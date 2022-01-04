import React from "react";
import { Link } from "react-router-dom";

export const SearchHOC = (WrappedComponent, entity) => {
  return class extends React.Component {
    state = {
      data: [],
      term: "",
    };
    componentDidMount() {
      const fetchData = async () => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${entity}`
        );
        const json = await response.json();
        this.setState({ ...this.state, data: json });
      };
      fetchData();
    }

    render() {
      let filteredData = this.state.data
        .slice(0, 10)
        .filter((d) => d.name.indexOf(this.state.term) >= 0);
      const capitaliseEntity = entity.charAt(0).toUpperCase() + entity.slice(1);
      return (
        <div className="main">
          <h2>
            {capitaliseEntity} List
            <Link to="add">
              <button className="ui button blue right floated">
                Add {capitaliseEntity}
              </button>
            </Link>
          </h2>
          <div className="ui search">
            <div className="ui icon input">
              <input
                type="text"
                placeholder="Search contacts"
                className="prompt"
                value={this.state.term}
                onChange={(e) =>
                  this.setState({ ...this.state, term: e.target.value })
                }
              />
              <i className="search icon" />
            </div>
          </div>
          <div className="ui celled list">
            <WrappedComponent data={filteredData} />
          </div>
        </div>
      );
    }
  };
};
