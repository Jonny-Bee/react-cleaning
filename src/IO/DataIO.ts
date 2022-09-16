import type { week } from "../contexts/calender-context/calender-context";
import type { user_object } from "../contexts/user-context/user-context";
import type { layout } from "../contexts/layout-context/layout-context";
import { location } from "../contexts/location-context/location-context";
const api_url = 'https://wp-clean.herokuapp.com/';




export const getWeeks = async( onLoaded:(data:week[]) => void) => {
    try {

        //console.log('loading...')
        fetch(api_url + 'weeks/')
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}


interface IUpdateWeekParams{
    [key: string]: string ;
    id: string,
    field:string,
    value: string,
    user_name:string,
    store_number:string,
    hash:string
}

export const updateWeek = async (req:IUpdateWeekParams, onLoaded:(data:string) => void) => {
    try {
        let params = new URLSearchParams(req).toString();
        //console.log('loading...')
        fetch(api_url + 'weeks/update/?' + params)
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}
interface ILoginParams{
    [key: string]: string ;
    user_name:string,
    pass_word:string
}

export const Login = async(req:ILoginParams, onLoaded:(data:user_object) => void) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'login/?' + params)
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}

interface IUpdateLayoutParams{
    [key: string]: string ;
    id: string,
    field: string,
    value: string,
    user_name:string,
    store_number:string,
    hash:string
}

export const updateLayout = async(req:IUpdateLayoutParams) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'layouts/update/?' + params)
            .then(res => res.json())

    } catch (error) {
        console.log(error);
    }
}
interface IGetLayoutParams{
    [key: string]: string ;
    section:string,
    user_name:string,
    store_number:string,
    hash:string

}
export const getLayouts = async(req:IGetLayoutParams, onLoaded:(data:layout[]) => void) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'layouts/?' + params)
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}
interface IGetLocationsParams{
    [key: string]: string ;
    section:string,
    user_name:string,
    store_number:string,
    hash:string
}
export const getLocations = async(req:IGetLocationsParams, onLoaded:(data:location[]) => void) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'location/?' + params)
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}
interface IGetStoreParams{
    [key: string]: string ;
    section:string,
    user_name:string,
    store_number:string,
    hash:string
}
export const getStore = async(req:IGetStoreParams, onLoaded:(data:location[]) => void) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'store/?' + params)
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}
interface IinsertLocationParams{
    [key: string]: string ;
    layout: string,
    bay:string,
    date:string
    user_name:string,
    store_number:string,
    hash:string
}
export const insertLocation = (req:IinsertLocationParams, onLoaded:(data:string) => void) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'location/insert/?' + params)
            .then(res => res.json())
            .then(data => {
                onLoaded(data)
            });
    } catch (error) {
        console.log(error);
    }
}
interface IUpdateLocationParams{
    [key: string]: string ;
    bay_id: string,
    field: string,
    value: string,
    user_name:string,
    store_number:string,
    hash:string
}
export const updateLocation = (req:IUpdateLocationParams) => {
    try {
        let params = new URLSearchParams(req).toString();
       // console.log('loading...')
        fetch(api_url + 'location/update/?' + params)
            .then(res => res.json())

    } catch (error) {
        console.log(error);
    }
}