import { de  } from 'date-fns/locale';
import {
  getVehicleById,
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from './db/vechile.js';

export const resolvers = {
  Query: {
    getVehicleDetail: (_, { vehicleid }) => getVehicleById(vehicleid),
    getAllVehicleDetails: () => getAllVehicles()
  },
  Mutation: {
    addVehicle: (_, { input }) => createVehicle(input),
    editVehicle: (_, { vehicleId, input }) => updateVehicle(vehicleId, input),
    deleteVehicle: (_, { vehicleId }) => deleteVehicle(vehicleId)
  }
};
