import db from './db.js'; // This should be a configured pg client from 'pg'

/** Get a single vehicle by ID */
export async function getVehicleById(id) {
  const result = await db.query(
    'SELECT * FROM vehicleDetails WHERE vehicleid = $1',
    [id]
  );

  // If no vehicle is found, return a message
  if (result.rows.length === 0) {
    const message = `Vehicle with ID ${id} not found.`;
    return { message };
  }

  const getelementbyid = result.rows[0];
  return {
    ...getelementbyid,
    saledate: new Date(getelementbyid.saledate).toISOString().split('T')[0] // Ensure saledate is in ISO format
  };
}

/** Get all vehicles */
export async function getAllVehicles() {
  const result = await db.query('SELECT * FROM vehicleDetails');
  const getallvehicle=result.rows;
  //returninhbng all vehcles in decending order of vehicleid
  getallvehicle.sort((a, b) => b.vehicleid - a.vehicleid);
  const message =`All vechile details`;
  return getallvehicle.map(vehicle => ({
    ...vehicle,
    saledate: new Date(vehicle.saledate).toISOString().split('T')[0] ,
    message// Ensure saledate is in ISO format
  }));
}






/** Create a new vehicle */
export async function createVehicle(input) {
  const {
    registrationnumber,
    city,
    saledate,
    vehicletype,
    vehiclebrand
  } = input;

  console.log('Creating vehicle:', input);
  
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  const specailregex=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  //validating registrationnumber
  if (registrationnumber.length < 5 ) {
    return {message:`Registration number should be greaterthen 5`}; 
  }
else if (registrationnumber.length >10) {
    return {message:`Registration number should be lessthen 10`}; 
}

//validation for checking special charecteristics for registernumber
else if (specailregex.test(registrationnumber)) {
   return {message:`Registration number should not contain any special characters`};
}
//length validation for city

else if (city.length < 3 ) {
    return {message:`city charecter should be greaterthen 3`}; 
}
else if (city.length > 100) {
    return {message:`city charecter should be lessthen 100`}; 
}

//length validation for vechiletype
else if (vehicletype.length < 3 ) {
    return {message:`vechiletype charecteristics should be greaterthen 3`}; 
}
else if (vehicletype.length >100) {
    return {message:`vechiletype charecteristics should be lessthan 100`}; 
}

//lenght validation for vechilebrand
else if (vehiclebrand.length < 3 ) {
    return {message:`vechilebrand charecteristics should be greaterthen 3`};
}
else if (vehiclebrand.length >100 ) {
    return {message:`vechilebrandcharecteristics should be lessthen 3`}; 
}
 //vallidation for dateformat
  else if (!dateFormatRegex.test(saledate)) {
    return {message:`date should be in yyyy-mm-dd`}
  }
  //console.log('cant add');

  


  const result = await db.query(
    `INSERT INTO vehicleDetails 
      (registrationnumber, city, saledate, vehicletype, vehiclebrand)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [registrationnumber, city, saledate, vehicletype,vehiclebrand]
  );

const message =`New vehicledetail added successfully`
  console.log('Vehicle created:', result.rows[0]);
  const createdVehicle = result.rows[0];
  return {
    ...createdVehicle,
    saledate: new Date(createdVehicle.saledate).toISOString().split('T')[0],
    message
     
  };
}


/** Update an existing vehicle by ID */

export async function updateVehicle(vehicleid, input) {
  const {
    registrationnumber,
    city,
    saledate,
    vehicletype,
    vehiclebrand
  }=input;
  
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  const specailregex=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  //validating registrationnumber
  if (registrationnumber.length < 5 ) {
    return {message:`Registration number should be greaterthen 5`}; 
  }
else if (registrationnumber.length >10) {
    return {message:`Registration number should be lessthen 10`}; 
}

//validation for checking special charecteristics for registernumber
else if (specailregex.test(registrationnumber)) {
   return {message:`Registration number should not contain any special characters`};
}
//length validation for city

else if (city.length < 3 ) {
    return {message:`city charecter should be greaterthen 3`}; 
}
else if (city.length > 100) {
    return {message:`city charecter should be lessthen 100`}; 
}

//length validation for vechiletype
else if (vehicletype.length < 3 ) {
    return {message:`vechiletype charecteristics should be greaterthen 3`}; 
}
else if (vehicletype.length >100) {
    return {message:`vechiletype charecteristics should be lessthan 100`}; 
}

//lenght validation for vechilebrand
else if (vehiclebrand.length < 3 ) {
    return {message:`vechilebrand charecteristics should be greaterthen 3`};
}
else if (vehiclebrand.length >100 ) {
    return {message:`vechilebrandcharecteristics should be lessthen 3`}; 
}
 //vallidation for dateformat
  else if (!dateFormatRegex.test(saledate)) {
    return {message:`date should be in yyyy-mm-dd`}
  }
  
  const result=await db.query(
    `UPDATE vehicleDetails
    SET registrationnumber=$1, city=$2, saledate=$3, vehicletype=$4, vehiclebrand=$5
    where vehicleid=$6
    RETURNING *`,

    [registrationnumber,city,saledate,vehicletype,vehiclebrand,vehicleid ]

  );
  const message =`vehicle updated successfully`;

  const updatedVehicle = result.rows[0];
  return {
    ...updatedVehicle,
    saledate: new Date(updatedVehicle.saledate).toISOString().split('T')[0],
    message
     
  };
}



export async function deleteVehicle(vehicleid) {
  const result = await db.query(
    'DELETE FROM vehicleDetails WHERE vehicleid = $1 RETURNING *',
    [vehicleid]
  );

  if (result.rows.length === 0) {
    throw new Error(`Vehicle with ID ${vehicleid} not found.`);
  }
  console.log('Deleted vehicle:', result.rows[0]);
  // Return the deleted vehicle details
  const message="Deleted detail succussfully";
  const deletedVehicle = result.rows[0];
  return {
    ...deletedVehicle,
    saledate: new Date(deletedVehicle.saledate).toISOString().split('T')[0],
    message // Ensure saledate is in ISO format
  };
}