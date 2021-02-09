import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  loadPassengers,
  savePassenger,
  deletePassenger
} from "../../redux/actions/passengerAction";
import propTypes from "prop-types";

function ManagePassengerPage() {
  const passengers = useSelector((state) => state.passengers);
  const dispatch = useDispatch();
  const [state] = useState({
    columns: [
      {
        title: "Name",
        field: "name"
      },

      {
        title: "Passport No",
        field: "passport"
      },
      {
        title: "Address",
        field: "address"
      },
      {
        title: "DOB",
        field: "dob",
        type: "date"
      },

      {
        title: "Weelchair",
        field: "weelchair",
        type: "boolean"
      },
      {
        title: "Infant",
        field: "infant",
        type: "boolean"
      },
      {
        title: "Spl Meals",
        field: "specialMeals",
        type: "boolean"
      },
      {
        title: "Flight",
        field: "flight",
        lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight 3" }
      },
      {
        title: "Seat No",
        field: "seatno",
        lookup: {
          A1: "A1",
          B1: "B1",
          C1: "C1",
          A2: "A2",
          B2: "B2",
          C2: "C2"
        }
      }
    ]
  });

  const [mandatoryFilter, setMandatoryfilter] = useState(true);

  useEffect(() => {
    dispatch(
      loadPassengers({
        mandarotyFileds: false,
        flight: 0
      })
    ).catch(() => {});
  }, [dispatch]);

  function handleSave(passenger) {
    dispatch(savePassenger(passenger));
  }

  async function handleDeletePassenger(passenger) {
    await dispatch(deletePassenger(passenger));
  }

  return (
    <>
      <MaterialTable
        style={{ maxWidth: "100%" }}
        title="Manage Passenger"
        columns={state.columns}
        data={passengers}
        localization={{
          header: {
            actions: "Actions"
          },
          body: {
            emptyDataSourceMessage: "No records to display",
            filterRow: {
              filterTooltip: "Filtering"
            }
          }
        }}
        actions={[
          {
            icon: () => <FilterListIcon />,
            tooltip:
              "Filter passengers by missing mandatory requirements (Passport,Address & DOB)",
            isFreeAction: true,
            onClick: (event) => {
              setMandatoryfilter(!mandatoryFilter);
              dispatch(loadPassengers({ mandarotyFileds: mandatoryFilter }));
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          headerStyle: {
            backgroundColor: "#01579b"
            //color: '#FFF'
          },
          rowStyle: {
            backgroundColor: "#EEE"
          },
          searchFieldStyle: {
            backgroundColor: "white"
          }
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleSave({ ...newData, id: null });
              resolve();
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              resolve();
              handleSave(newData);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve();
              handleDeletePassenger(oldData);
            })
        }}
      />
    </>
  );
}

ManagePassengerPage.propTypes = {
  passengers: propTypes.array.isRequired,
  loadPassengers: propTypes.func.isRequired,
  savePassenger: propTypes.func.isRequired,
  deletePassenger: propTypes.func.isRequired
};
export default ManagePassengerPage;
