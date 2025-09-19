import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import Autocomplete from 'react-google-autocomplete';
import "./Map.css";
import { CircularProgress } from "@mui/material";
import search from "../assets/images/search.svg"
import styled from "@emotion/styled";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
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



const AutocompleteWrapper = styled('div')(({ theme }) => ({
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
  cursor:"pointer",
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

const Map = ({setLocation , latPos  , lngPos , mapWidth , mapHeight , showSearch , handelAddressChanged, branches, fitBounds}) => {
  // const center = useMemo(() => ({ lat: latPos, lng: lngPos}), []);
  const [mPosition , setMPosition] = useState({ lat: latPos, lng: lngPos })
  const [center , setCenter] = useState({ lat: latPos, lng: lngPos })
  const [zoom , setZoom] = useState(10)
  const mapRef = useRef(null);

  // Effect to fit bounds when branches are provided
  useEffect(() => {
    if (fitBounds && branches && branches.length > 0 && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      
      branches.forEach(branch => {
        if (branch.lat && branch.long && 
            !isNaN(parseFloat(branch.lat)) && !isNaN(parseFloat(branch.long))) {
          bounds.extend({
            lat: parseFloat(branch.lat),
            lng: parseFloat(branch.long)
          });
        }
      });
      
      mapRef.current.fitBounds(bounds);
      
      // Add some padding to the bounds
      const padding = { top: 20, right: 20, bottom: 20, left: 20 };
      mapRef.current.fitBounds(bounds, padding);
    }
  }, [branches, fitBounds]);

  
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
              onLoad={(map) => {
                mapRef.current = map;
              }}
            >
              <AutocompleteWrapper
                  style={{
                      display : showSearch == false ?  "none" : "block"
                  }}
                >
              <GooglePlacesAutocomplete
                  apiKey='AIzaSyBBZLX5WuQeLU8CSkyCbvkXRQJZ8OsoIZs'

                  selectProps={{
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      cursor: 'pointer',
                    }),
                  },

                  onChange: (place)=>{
                    console.log(place);
                    geocodeByAddress(place.label)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) =>{

                      console.log('Successfully got latitude and longitude', { lat, lng })
                      setZoom(10)
                      placeMarker({ lat, lng });
                    }
                    );

                  },
                  }}
              />
                
              </AutocompleteWrapper>

              {/* Render multiple markers if branches are provided */}
              {branches && branches.length > 0 ? (
                branches
                  .filter(branch => branch.lat && branch.long && 
                    !isNaN(parseFloat(branch.lat)) && !isNaN(parseFloat(branch.long)))
                  .map((branch, index) => (
                    <MarkerF 
                      key={index}
                      position={{ 
                        lat: parseFloat(branch.lat), 
                        lng: parseFloat(branch.long) 
                      }}
                      title={branch.name || `Branch ${index + 1}`}
                    />
                  ))
              ) : (
                <MarkerF draggable position={mPosition} onDrag={(event)=>placeMarker(event.latLng.toJSON())} />
              )}
            </GoogleMap>
          )}
        </div>
      );
};

export default Map;