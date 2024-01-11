import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { useHistory } from "react-router-dom";

const SearchBar = ({wordEntered,error, setWordEntered, placeholder,  setDestination }) => {
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [data , setData] = useState([]);
  const getData  = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/city`);
      const data2 = await response.json();
      setData(data2.data);
      setFilteredData(data2.data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getData();
  },[])

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(data);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData(data);
    setWordEntered("");
  };

  return (
    <div className="w-full relative dropdown dropdown-bottom">
      <div className={`border-b-2 ${error? "border-red-400" : "border-gray-400"}   p-1` }  >
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          tabIndex={0} 
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
        <ul tabIndex={0} className="absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
          {filteredData.slice(0, 15).map((ele, index) => {
            return (
              <li
                className="cursor-pointer  hover:text-primary rounded-xl p-1 hover:bg-white"
                onClick={() => {
                  setWordEntered(ele.name);
                  setDestination(ele.name.toLowerCase());
                  setFilteredData([]);
                }}
                key="index"
              >
                {/* <p className="dataItem"> */}
                <p className="text-base text-gray-400 font-semibold hover:text-primary">{ele.name} </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
