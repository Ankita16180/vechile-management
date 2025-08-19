// utils/validation.js
import dayjs from "dayjs";

export function validateVehicleForm({ registration, city, saledate, type, brand }) {
  const specialRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  let errors = {};

  // Registration
  if ( registration.length < 5) {
    errors.registration = " should greaterthan 5 characters";
  } else if (registration.length > 10) {
    errors.registration = "Registration number should not exceed 10 characters";
  } else if (specialRegex.test(registration)) {
    errors.registration = "Registration number should not contain special characters";
  }

  // City
  if ( city.length < 3) {
    errors.city = "City should be at least 3 characters";
  } else if (city.length > 100) {
    errors.city = "City should not exceed 100 characters";
  }

  // Vehicle type
  if ( type.length < 3) {
    errors.type = "Vehicle type should be at least 3 characters";
  } else if (type.length > 100) {
    errors.type = "Vehicle type should not exceed 100 characters";
  }

  // Vehicle brand
  if ( brand.length < 3) {
    errors.brand = "Vehicle brand should be at least 3 characters";
  } else if (brand.length > 100) {
    errors.brand = "Vehicle brand should not exceed 100 characters";
  }

  // Sale date
  if (saledate && !dateFormatRegex.test(dayjs(saledate).format("YYYY-MM-DD"))) {
    errors.saledate = "Date should be in YYYY-MM-DD format";
  }

  return errors;
}
