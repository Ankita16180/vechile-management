// Delete.jsx
import React from "react";
import { gql, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";

const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($vehicleId: ID!) {
    deleteVehicle(vehicleId: $vehicleId) {
      vehicleid
    }
  }
`;


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


export default function Delete({ vehicleid, onDeleted }) {
  const [deleteVehicle] = useMutation(DELETE_VEHICLE,{
    refetchQueries: [{ query: GET_VEHICLES }], 
  });
  
  async function handleDelete() {
    try {
      const res = await deleteVehicle({ variables: { vehicleId: vehicleid } });
      console.log("Deleted:", res.data.deleteVehicle);
      if (onDeleted) onDeleted(vehicleid); 
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  }

  return (
    <Button
      size="small"
      style={{ right: -220, bottom: 250 }}
      onClick={handleDelete}
    >
      🗑️ Delete
    </Button>
  );
}
