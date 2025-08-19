import { gql } from "@apollo/client"
export const ADD_VEHICLE=gql `
mutation AddVehicle($input: AddVehicleInput!) {
  addVehicle(input: $input) {
    vehicleid
    registrationnumber
    city
    saledate
    vehicletype
    vehiclebrand
    message
    
  }
}
  `;
