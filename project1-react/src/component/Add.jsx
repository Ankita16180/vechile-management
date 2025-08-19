import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./add.css";
import { gql, useMutation } from "@apollo/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {validateVehicleForm} from "./validation"
import FormHelperText from "@mui/material/FormHelperText";
// import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Form } from "react-router-dom";
import { FormControl } from "@mui/material";


function Add({ onAdd, onCancel}) {
  const tomorrow = dayjs().add(1, 'day');
  const ADD_VEHICLE = gql`
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

const [errors, setErrors] = useState({});

  const [addVehicle] = useMutation(ADD_VEHICLE,{
    refetchQueries:[{ query: GET_VEHICLES }], 

  });

  const [form, setForm] = useState({
    registration: "",
    brand: "",
    type: "",
    city: "",
    saledate: null, 
  });

  function handleChange(e) {
    // e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
    
  }

  function handleDateChange(newValue) {
    setForm({ ...form, saledate: newValue });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const validationErrors = validateVehicleForm(form);
    if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors); 
    return;
  }

   
    console.log("Form submitted:", form);
    
    try {
      const res = await addVehicle({
        variables: {
          input: {
            registrationnumber: form.registration,
            vehiclebrand: form.brand,
            vehicletype: form.type,
            city: form.city,
            saledate: form.saledate
              ? dayjs(form.saledate).format("YYYY-MM-DD")
              : null,
          },
        },
      });
       
  

      if (onAdd) onAdd(res.data.addVehicle);
      setForm({
        registration: "",
        brand: "",
        type: "",
        city: "",
        saledate: null,
      });
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  }
   

    // const [open, setOpen] = React.useState(false);
    // const handleCancel = () => setOpen(true);
    
  

     
   
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vehicle</h2>
      <div className="formlist">
         <FormControl error={!!errors.registration} fullWidth>
        <label>Registration number:</label>
        <TextField
          name="registration"
          value={form.registration}
          onChange={handleChange}
          variant="filled"
          error={!!errors.registration}
          required/>
      {errors.registration && <FormHelperText> {errors.registration}</FormHelperText>}
</FormControl>



        <FormControl error={!!errors.brand} fullWidth>
        <label>VehicleBrand:</label>
        <TextField
          name="brand"
          value={form.brand}
          onChange={handleChange}
          variant="filled"
          fullWidth
          error={errors.brand}
          required
        />
         {errors.brand && <FormHelperText> {errors.brand}</FormHelperText>}
</FormControl>




        <FormControl error={!!errors.type} fullWidth>
        <label>Vehicle Type:</label>
        <TextField
          name="type"
          value={form.type}
          onChange={handleChange}
          variant="filled"
          error={errors.type}
          fullWidth
          required
        />
         {errors.type && <FormHelperText> {errors.type}</FormHelperText>}
</FormControl>




        <FormControl error={!!errors.city} fullWidth>
        <label>City:</label>
        <TextField
          name="city"
          value={form.city}
          onChange={handleChange}
          variant="filled"
          error={errors.city}
          fullWidth
          required
        />
         {errors.city && <FormHelperText> {errors.city}</FormHelperText>}
</FormControl>



        <FormControl error={!!errors.saledate} fullWidth>
        <label>Sales Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={form.saledate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            slotProps={{ textField: { variant: "filled", fullWidth: true } }}
            error={errors.saledate}
            required
            defaultValue={tomorrow} disableFuture
          />
        </LocalizationProvider>
         {errors.saledate && <FormHelperText> {errors.saledate}</FormHelperText>}
</FormControl>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Button
          className="button1"
          variant="contained"
          onClick={() => onCancel && onCancel()}
          sx={{ marginRight: 1 }}
        >
          Cancel
        </Button>
        <Button className="button2" variant="contained" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

export default Add;
