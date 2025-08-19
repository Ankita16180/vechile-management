

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './add.css'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState,useEffect} from 'react';
import { graphQLResultHasError } from '@apollo/client/utilities';
import { gql, useQuery, useMutation } from "@apollo/client";
import { FormControl,FormHelperText } from '@mui/material';
import {validateVehicleForm} from "./validation"
import InfoOutlined from '@mui/icons-material/InfoOutlined';

function Edit({onCancel,vehicleid}){
  const tomorrow = dayjs().add(1, 'day');

const GET_VEHICLE_ID=  gql`
query GetVehicleDetail($vehicleid: ID!) {
  getVehicleDetail(vehicleid: $vehicleid) {
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

const   UPDATE_VEHICLE=gql`
mutation EditVehicle($vehicleId: ID!, $input: EditVehicleInput!) {
  editVehicle(vehicleId: $vehicleId, input: $input) {
    vehicleid
    registrationnumber
    city
    saledate
    vehicletype
    vehiclebrand
    message
  }
}`;

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


 const [editVehicle] = useMutation(UPDATE_VEHICLE,{
    refetchQueries:[{ query: GET_VEHICLES }], 

  });


  const { loading, error, data } = useQuery(GET_VEHICLE_ID, {
    variables: { vehicleid },
    skip: !vehicleid,
  });

  const [form, setForm] = useState({
    registration: "",
    brand: "",
    type: "",
    city: "",
    saledate: null,
  });

 useEffect(() => {
    if (data&& data.getVehicleDetail) {
      const v = data.getVehicleDetail;
      setForm({
        registration: v.registrationnumber || "",
        brand: v.vehiclebrand || "",
        type: v.vehicletype || "",
        city: v.city || "",
        saledate: v.saledate || null,
      });
    }
  }, [data]);


  function handleSubmit(event){
    event.preventDefault();
    console.log("editted submitted");
  }



  function handleDateChange(newValue) {
         setForm({ ...form, saledate: newValue ? newValue.toISOString() : null });s
    }

    async function handleSubmit(e) {
    e.preventDefault();

      const validationErrors = validateVehicleForm(form);
          if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors); 
          return;
        }
      

    try {
      const res = await editVehicle({
        variables: {
          vehicleId: vehicleid,
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

      console.log("Updated:", res.data.editVehicle);
      onCancel();
    } catch (err) {
      console.error("Error editing vehicle:", err);
    }
  }

  console.log(form, "form data")
  return (
    <>
    
    <h4> Edit vechile </h4>
      <form onSubmit={handleSubmit}>
        <div className="formlist">
           <FormControl error={!!errors.registration} fullWidth>
    <label> Registration number: </label>
    <TextField id="filled-basic" variant="filled" value={form.registration} onChange={(e) => setForm({ ...form, registration: e.target.value })} error={errors.registration} required/>
      {errors.registration && <FormHelperText> {errors.registration}</FormHelperText>}
</FormControl> <br></br>


  <FormControl error={!!errors.brand} fullWidth>
    <label> vechile Brand: </label>
    <TextField id="filled-basic" variant="filled" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} error={errors.brand} required />
      {errors.brand && <FormHelperText> {errors.brand}</FormHelperText>}
</FormControl> <br></br>


  <FormControl error={!!errors.type} fullWidth>
    <label> vechile Type: </label>
    <TextField id="filled-basic" variant="filled" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} error={errors.type} required/>
      {errors.type && <FormHelperText> {errors.type}</FormHelperText>}
</FormControl> <br></br>


      <FormControl error={!!errors.city} fullWidth>
    <label> City:</label>
    <TextField id="filled-basic" variant="filled"  value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={errors.city} required/>
      {errors.city && <FormHelperText> {errors.city}</FormHelperText>}
</FormControl> <br></br><br />


      <FormControl error={!!errors.saledate} fullWidth>
    <label>Salesdate: </label>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="YYYY-MM-DD"
                slotProps={{ textField: { variant: "filled" } }}
                value={dayjs(form.saledate)}
                onChange={handleDateChange}
                defaultValue={tomorrow} disableFuture
              />
            </LocalizationProvider>
            {errors.saledate&& <FormHelperText>{errors.saledate}</FormHelperText>}
</FormControl>

    </div>
    <br></br>
      <Button
          className="button1"
          variant="contained"
          onClick={onCancel}
          sx={{ marginRight: 1 }}
        > Cancel 
        </Button>
    <Button  className= "button2 "  variant="contained" type='submit' > Edit </Button>
   
    </form>
   
    </>
  );x
}
export default Edit



