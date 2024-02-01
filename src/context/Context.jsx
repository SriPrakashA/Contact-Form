import React, { createContext,  useReducer, useState } from "react";

const dataProvider = createContext([]);

const Supplier = (props) => {
  const [statusCode, setStatusCode] = useState(0);
  const [initialvalue, setInitialvalue] = useState([]);

  const [data, setData] = useReducer(myFunction, initialvalue);

  function myFunction(state, action) {
    switch (action.type) {
      case "get":
        return (state = action.value);
      case "add":
        let isPresent = false;
        state.forEach((val) => {
          if (val.email === action.value.email) isPresent = true;
        });
        if (isPresent) {
          setStatusCode(2);
          setTimeout(() => {
            setStatusCode(0);
          }, 2000);
          return [...state];
        } else {
          setStatusCode(1);
          setTimeout(() => {
            setStatusCode(0);
          }, 2000);
          let sorted = [...state,action.value];
          return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
          // return [...state, action.value];
          // return state.shift(action.value)
        }
        break;
      case "update":
        let isExist = false;
        state.forEach((val) => {
          if (val.email === action.value.email && val.id !== action.value.id ) isExist = true;
        });
        if (isExist) {
          setStatusCode(2);
          setTimeout(() => {
            setStatusCode(0);
          }, 2000);
          return [...state];
        } else {
          let updated_contacts = state.map((val) => {
            if (val.id === action.value.id) {
              return {
                ...val,
                ...action.value,
              };
            }
            return val;
          });
          setStatusCode(3);
          setTimeout(() => {
            setStatusCode(0);
          }, 2000);
          return (state = updated_contacts);
        }
        

      case "delete":
        const ans = state.filter((val) => val.id !== action.value.id);
        setStatusCode(4);
        setTimeout(() => {
          setStatusCode(0);
        }, 2000);
        return (state = ans);
      default:
        return state;
    }
  }

  return (
    <>
      <dataProvider.Provider
        value={{ data, setData, statusCode, setStatusCode }}
      >
        {props.children}
      </dataProvider.Provider>
    </>
  );
};

export { Supplier, dataProvider };
