import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { getLocations, insertLocation, getStore } from "../../IO/DataIO";
import { UserContext } from "../user-context/user-context";
export const LocationContext = createContext({
  locations: [],
  setLocations: () => {},
  section: null,
  setSection: () => {},
  store: [],
  setStore: () => {},
});

export const LocationContextProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [section, setSection] = useState("Ambient");
  const [store, setStore] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    //console.log("loading Locations");
    const f = (data) => {
     // console.log(data);

      setLocations(data);
    };
    getLocations({ section: section, ...user }, f);
  }, [section]);

  useEffect(() => {
    //console.log("loading store");
    const f = (data) => {
      //console.log(data);

      setStore(data);
    };
    getStore({ section: section, ...user }, f);
  }, [user]);

  const cUpdateLocation = (data) => {
    let tLocations = [...locations];
    //console.log(data);
    for (var i = 0; i < tLocations.length; i++) {
      if (tLocations[i].bay_id === data.bay_id) {
        tLocations[i] = data;
        //console.log("found match");
      }
    }
    setLocations(tLocations);
  };
  const reloadLocations = (e) => {
    const f = (data) => {
      //console.log(data);
      if (data.length > 0) setLocations(data);
    };
    getLocations({ section: section, ...user }, f);
  };

  const addLocation = (data) => {
    let req = { layout: data.layout_id, ...user };
    let c = 1;
    for (let i = 0; i < locations.length; i++) {
      c += locations[i].layout_id === parseInt(data.layout_id) ? 1 : 0;
    }
    req.bay = c;
    req.date = data.date;
    insertLocation(req, reloadLocations);
  };

  const value = {
    store,
    locations,
    setLocations,
    cUpdateLocation,
    section,
    setSection,
    addLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
