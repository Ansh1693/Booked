import React, {useState} from "react";
import {UserContext} from "./hotelsContext.js";

const UserStateContext = (props) => {

  const [userData , setUserData] = useState();

  return (
    <UserContext.Provider value={{ userData , setUserData}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStateContext;
