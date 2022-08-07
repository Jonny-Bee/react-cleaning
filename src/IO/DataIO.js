
const api_url = 'https://wp-clean.herokuapp.com/';

export const getWeeks = (onLoaded) =>{
    try{
        console.log('loading...')
        fetch(api_url + 'weeks/')
        .then(res => res.json())
        .then(data => {onLoaded(data)});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const updateWeek = (req,onLoaded) =>{
    try{
        let params = new URLSearchParams(req).toString();
        console.log('loading...')
        fetch(api_url + 'weeks/update/?' + params)
        .then(res => res.json())
        .then(data => {onLoaded(data)});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const updateLayout = (req) =>{
    try{
        let params = new URLSearchParams(req).toString();
        console.log('loading...')
        fetch(api_url + 'layouts/update/?' + params)
        .then(res => res.json())
        
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getLayouts = (req,onLoaded) => {
    try{
        let params = new URLSearchParams(req).toString();
        console.log('loading...')
        fetch(api_url + 'layouts/?' + params)
        .then(res => res.json())
        .then(data => {onLoaded(data)});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getLocations = (req,onLoaded) => {
    try{
        let params = new URLSearchParams(req).toString();
        console.log('loading...')
        fetch(api_url + 'location/?' + params)
        .then(res => res.json())
        .then(data => {onLoaded(data)});
    }
    catch(error)
    {
        console.log(error);
    }
}
export const getStore = (req,onLoaded) => {
    try{
        
        console.log('loading...')
        fetch(api_url + 'store/')
        .then(res => res.json())
        .then(data => {onLoaded(data)});
    }
    catch(error)
    {
        console.log(error);
    }
}
export const insertLocation = (req,onLoaded) => {
    try{
        let params = new URLSearchParams(req).toString();
        console.log('loading...')
        fetch(api_url + 'location/insert/?' + params)
        .then(res => res.json())
        .then(data => {onLoaded(data)});
    }
    catch(error)
    {
        console.log(error);
    }
}

export const updateLocation = (req) =>{
    try{
        let params = new URLSearchParams(req).toString();
        console.log('loading...')
        fetch(api_url + 'location/update/?' + params)
        .then(res => res.json())
        
    }
    catch(error)
    {
        console.log(error);
    }
}