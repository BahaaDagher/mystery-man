import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import "./Map.css";
import { CircularProgress } from "@mui/material";
import search from "../assets/images/search.svg"
import styled from "@emotion/styled";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";



const Autocompletee = styled(Autocomplete)(({ theme }) => ({
  width: '434px',
  height: '60px',
  padding: '0 20px 0 35px ',
  position:'fixed',
  top : "13%" ,
  transform: "translate(-50%, -50%)" , 
  left : "50%" , 
  border : "none" , 
  outline : "none" ,
  borderRadius : "10px" ,
  opacity : "0.8" ,
  [theme.breakpoints.down("500")]: {
    width:"96%",
    marginLeft : "2%" ,  
    left : "0"  , 
    transform: "translate(0, -50%)" , 
  },
}));

const SearchIcon = styled("img")(({ theme }) => ({
  position :"fixed" ,
  top :  "calc(11% + 3px)" , 
  left : "calc(50% - 213px)" ,
  [theme.breakpoints.down("500")]: {
    display : "none" ,
  },

}));

const Map = ({setLocation , latPos  , lngPos , mapWidth , mapHeight , showSearch , handelAddressChanged}) => {
  // const center = useMemo(() => ({ lat: latPos, lng: lngPos}), []);
  const [mPosition , setMPosition] = useState({ lat: latPos, lng: lngPos })
  const [center , setCenter] = useState({ lat: latPos, lng: lngPos })
  const [zoom , setZoom] = useState(10)

  
  setDefaults({
    key: "AIzaSyCtoOSkC_xpom94NO2vGj1S2TsNltZ5sSY", // Your API key here.
    language: "en", // Default language for responses.
   // Default region for responses.
  });

  const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCtoOSkC_xpom94NO2vGj1S2TsNltZ5sSY",
        libraries: ['places']
  });
    
  function placeMarker(loc) {
    
    setMPosition(loc)
    console.log(loc);
    fromLatLng(loc.lat ,loc.lng).then( (res) => {
    console.log(res.results[0].formatted_address);
    handelAddressChanged(res.results[0].formatted_address)
    setZoom(prev => prev==18 ? prev : prev+2)
  })
    setCenter(loc)
    if (setLocation) setLocation(loc) // it is props
  }


      
      return (
        <div className="App"  style = {{width : mapWidth ,  height : mapHeight}}>
          {!isLoaded ? (
            <CircularProgress style={{position : "fixed" , top : "50%" , left : "50%" , transform: "translate(-50%, -50%)" }}/>
          ) : (
            <GoogleMap
            
              mapContainerClassName="map-container"
              center={center}
              zoom={zoom}
              onClick={(event)=>{ placeMarker(event.latLng.toJSON());}}
            >
              <Autocompletee
                 
                  style={{
                      display : showSearch == false ?  "none" : "block"
                  }}
                  // onPlaceSelected={ this.onPlaceSelected }


                  apiKey='AIzaSyBBZLX5WuQeLU8CSkyCbvkXRQJZ8OsoIZs'
                  onPlaceSelected={(place) => 
                   {
                    setZoom(10)
                    placeMarker(place.geometry.location.toJSON());
                    
                   } 
                  
                  
                  }


                  placeholder="search"
              >
              </Autocompletee>
                <SearchIcon 
                  src= {search} 
                  alt="s-icon" 
                  border="0"  
                  style={{
                    display : showSearch == false ?  "none" : "block"
                  }}/>
              <MarkerF draggable position={mPosition} onDrag={(event)=>placeMarker(event.latLng.toJSON())} />
            </GoogleMap>
          )}
        </div>
      );
};

export default Map;