import React from "react";
import { gql, useQuery } from "@apollo/client";
import MediaCard from "./component/cardlist"; 
import './component/add.css'
import BasicModal from "./modal";

const GET_VEHICLES = gql`
  query {
    getAllVehicleDetails {
      vehicleid
      registrationnumber
      city
      vehiclebrand
      vehicletype
      saledate
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_VEHICLES);

  if (loading) return <p>Loading </p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Vehicles details...</h1>
      
      <BasicModal />
       <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>

      {data.getAllVehicleDetails.map((v) => (
       
        <MediaCard
          key={v.vehicleid}
          registration={v.registrationnumber}
          vehicleid={v.vehicleid}
          brand={v.vehiclebrand}
          type={v.vehicletype}
          city={v.city}
          saledate={v.saledate}
          onDeleted={(id) => {
            
        
        data.getAllVehicleDetails = data.getAllVehicleDetails.filter(
          (veh) => veh.vehicleid !== id
        );
      }}
        />
        
        
      ))}
        </div>
      </div>
  
  );
}

export default App;
