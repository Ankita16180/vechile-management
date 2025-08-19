import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const GET_VEHICLE = gql`
  query GetVehicleDetail($vehicleid: ID!) {
    getVehicleDetail(vehicleid: $vehicleid) {
      vehicleid
      registrationnumber
      vehiclebrand
      vehicletype
      city
      saledate
      message
    }
  }
`;

export default function Edit({ vehicleid, onCancel }) {
  const { loading, error, data } = useQuery(GET_VEHICLE, {
    variables: { vehicleid },   
    skip: !vehicleid,
  });

  const [form, setForm] = useState({
    registration: "",
    brand: "",
    type: "",
    city: "",
    saledate: "",
  });

  // prefill when data is loaded
  useEffect(() => {
    if (data?.getVehicleDetail) {
      const v = data.getVehicleDetail;
      setForm({
        registration: v.registrationnumber || "",
        brand: v.vehiclebrand || "",
        type: v.vehicletype || "",
        city: v.city || "",
        saledate: v.saledate || "",
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading vehicle</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit Vehicle</h2>
      <TextField
        label="Registration"
        name="registration"
        value={form.registration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Brand"
        name="brand"
        value={form.brand}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        value={form.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Sale Date"
        name="saledate"
        value={form.saledate}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <div style={{ marginTop: 16 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
