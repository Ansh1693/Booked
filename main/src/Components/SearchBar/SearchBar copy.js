import React, { useState } from "react";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";

const SearchBar = ({ placeholder, data, setDestination }) => {
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.city.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div> */}
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((ele, index) => {
            return (
              <p
                className="dataItem"
                onClick={() => {
                  setWordEntered(ele.city);
                  setDestination(ele.city.toLowerCase());
                  setFilteredData([]);
                }}
                key="index"
              >
                {/* <p className="dataItem"> */}
                <img src={ele.img} alt="" className="img-search"/>
                <p>{ele.city} </p>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
