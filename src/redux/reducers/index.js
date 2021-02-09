import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import passengers from "./passengerReducer";
import ancillaryServices from "./ancillaryServiceReducer";
import checkInPassengers from "./checkInPassengerReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
  apiCallsInProgress,
  passengers,
  ancillaryServices,
  checkInPassengers
});

export default rootReducer;
