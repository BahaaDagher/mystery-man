import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import "./Map2.css";

const Map2 = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBBZLX5WuQeLU8CSkyCbvkXRQJZ8OsoIZs",
        
      });
      const center = useMemo(() => ({ lat: 24.774265, lng: 46.738586}), []);
      const [mPosition , setMPosition] = useState({ lat: 24.774265, lng: 46.738586 })
      

     
     function placeMarker(location) {
        console.log(location);
        //  var marker = new google.maps.Marker({
        //      position: location, 
        //      map: map
        //  });
        setMPosition(location)
        console.log("mPosition" ,mPosition);
     }
    
      return (
        <div className="App">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
           
              mapContainerClassName="map-container"
              center={center}
              zoom={10}
              onClick={(event)=>{ placeMarker(event.latLng.toJSON());}}
            >
                <Autocomplete
                    style={{
                        width: '50%',
                        height: '40px',
                        paddingLeft: '16px',
                        marginTop: '2px',
                        marginBottom: '100px',
                        position:'absolute',
                        margin:'auto'
                    }}
                    // onPlaceSelected={ this.onPlaceSelected }
                   
                    apiKey='AIzaSyBBZLX5WuQeLU8CSkyCbvkXRQJZ8OsoIZs'
                    onPlaceSelected={(place) => console.log(place)}
                    />
              <Marker position={mPosition} />
            </GoogleMap>
          )}
        </div>
      );
};

export default Map2;