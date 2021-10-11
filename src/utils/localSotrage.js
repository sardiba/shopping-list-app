import { useState, useEffect } from "react";

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key, defaultValue) => {
  if (localStorage.getItem(key)) {
    console.log("LOG HERE", key, localStorage.getItem(key));

    return JSON.parse(localStorage.getItem(key));
  }
  setItem(key, defaultValue);
  return defaultValue;
};

/**
 * Replacement for useState, which stores the state in localStorage
 *
 * use it this way:
 * ```
 * const [myState, setMyState] = useLocalStoratgeState('storeAtThisKey', 'defaultValue')
 * ```
 * @param {*} key the key in which the value in localStorage stored
 * @param {*} defaultValue the default value for then the localStorage is empty
 * @returns A tuple of [state, setState]
 */
export const useLocalStorageState = (key, defaultValue) => {
  //custom Hook functions
  //we need the defaultState for react useState
  // where to get it? localStorage
  //getItem defaults to the defaultValue if localStorage is empty
  const defaultState = getItem(key, defaultValue);

  //this is a generic useState
  //we call the variables returned from it state and setState, becs we don't know what the person calling our function will store in the state.
  const [state, setState] = useState(defaultState);

  //use react useEffect to get a function that's always being called when the state variable changes
  useEffect(() => {
    //when the effect is being called we gotta update the localStorage
    //to contain the new updated version of the state variable
    setItem(key, state);
    //state is a dependency of this effect, bcs we only wanna call the effect function, when the state changes
  }, [state]);

  //mimic the return value of useState by returning the same variables
  return [state, setState];
};
