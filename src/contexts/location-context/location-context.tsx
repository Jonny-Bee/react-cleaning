import { useContext , FC} from "react";
import { createContext, useEffect, useState } from "react";
import { getLocations, insertLocation, getStore } from "../../IO/DataIO";
import { UserContext } from "../user-context/user-context";

export type location = {
  bay_id:number,
  layout_id:number,
  bay:number,
  last_clean:string,
  store_id:number,
  id:number,
  group_name:string,
  frequency:number,
  section:string,
  temp_check?:boolean

}
interface ILocationContextProps{

  locations:location[],
  setLocations:(a:location[]) => void,
  section:string,
  setSection:(a:string) => void,
  store:location[],
  setStore:(a:location[]) => void,
  cUpdateLocation :(data:location) => void,
  addLocation:(layoutid:number,date:string) => void

}

export const LocationContext = createContext<ILocationContextProps>({
  locations: [],
  setLocations: () => {},
  section: '',
  setSection: () => {},
  store: [],
  setStore: () => {},
  cUpdateLocation:() => {},
  addLocation:() => {}
});

interface ILocationProviderProps{
  children:React.ReactNode;
}
export const LocationContextProvider : FC<ILocationProviderProps> = ({ children }) => {
  const [locations, setLocations] = useState<location[]>([]);
  const [section, setSection] = useState<string>("Ambient");
  const [store, setStore] = useState<location[]>([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    //console.log("loading Locations");
    const f = (data:location[]) => {
     // console.log(data);

      setLocations(data);
    };
    getLocations({ section: section, ...user }, f);
  }, [section]);

  useEffect(() => {
    //console.log("loading store");
    const f = (data:location[]) => {
      //console.log(data);

      setStore(data);
    };
    getStore({ section: section, ...user }, f);
  }, [user]);

  const cUpdateLocation = (data:location) => {
    let tLocations:location[] = [...locations];
    //console.log(data);
    for (var i = 0; i < tLocations.length; i++) {
      if (tLocations[i].bay_id === data.bay_id) {
        tLocations[i] = data;
        //console.log("found match");
      }
    }
    setLocations(tLocations);
  };

  const reloadLocations = () => {
    const f = (data:location[]) => {
      //console.log(data);
      if (data.length > 0) setLocations(data);
    };
    getLocations({ section: section, ...user }, f);
  };

  const addLocation = (layout_id:number,date:string) => {
    let req = { layout: layout_id.toString(), ...user,bay:'-1',date:'' };
    let c = 1;
    for (let i = 0; i < locations.length; i++) {
      c += locations[i].layout_id === layout_id ? 1 : 0;
    }
    req.bay = c.toString();
    req.date = date;
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
    setStore
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
