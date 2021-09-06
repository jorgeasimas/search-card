import "./styles.scss";
import React, { useState, useEffect } from "react";
import { Cardlist } from "./card-list-component";
import { SearchBox } from "./search-box.component";
import { connect } from "react-redux";
import { fetchList } from "./sagas";

function App({ fetchList, data, loaded }) {
  const [searchField, setsearchField] = useState("");
  const filteredPeople = data.filter((newpeople) =>
    newpeople.name.toLowerCase().includes(searchField.toLowerCase())
  );
  /* will loop through people array check the props "name" and then filter
a new array that the props names matches to what has been typed */
  useEffect(() => {
    const fetchData = fetchList;
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Search Author App</h1>
      <SearchBox
        placeholder="search author"
        handleChange={(e) => setsearchField(e.target.value)}
      />
      {loaded ? (
        <Cardlist peopleList={filteredPeople}></Cardlist>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
  loaded: state.loaded,
});
const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(fetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
