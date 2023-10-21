import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import "./Map.css";
import { CircularProgress } from "@mui/material";
import search from "../assets/images/search.svg"
import styled from "@emotion/styled";




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

const Map = ({setLocation , latPos  , lngPos , mapWidth , mapHeight , showSearch}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBBZLX5WuQeLU8CSkyCbvkXRQJZ8OsoIZs",
      });
      const center = useMemo(() => ({ lat: latPos, lng: lngPos}), []);
      const [mPosition , setMPosition] = useState({ lat: 24.774265, lng: 46.738586 })

     function placeMarker(location) {
        console.log(location)
        setMPosition(location)
        console.log("mPosition" , mPosition);
        if (setLocation) setLocation(location) // it is props
     }

      return (
        <div className="App"  style = {{width : mapWidth ,  height : mapHeight}}>
          {!isLoaded ? (
            <CircularProgress style={{position : "fixed" , top : "50%" , left : "50%" , transform: "translate(-50%, -50%)" }}/>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
              onClick={(event)=>{ placeMarker(event.latLng.toJSON());}}
            >
              <Autocompletee
                  style={{
                      display : showSearch == false ?  "none" : "block"
                  }}
                  // onPlaceSelected={ this.onPlaceSelected }

                  apiKey='AIzaSyBBZLX5WuQeLU8CSkyCbvkXRQJZ8OsoIZs'
                  onPlaceSelected={(place) => console.log(place)}
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
              <Marker position={mPosition} />
            </GoogleMap>
          )}
        </div>
      );
};

export default Map;