import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import {
  loadAncillaryServices,
  saveAncillaryService,
  deleteAncillaryService
} from "../../redux/actions/ancillaryServiceAction";
import propTypes from "prop-types";

function ManageAncillaryServicePage() {
  const ancillaryServices = useSelector((state) => state.ancillaryServices);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Flight",
      field: "flight",
      lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight 3" }
    },
    {
      title: "Service Type",
      field: "type",
      lookup: { 1: "Sepcial Meals", 2: "Shopping Items", 3: "Extra luggage" }
    },
    {
      title: "Service",
      field: "service"
    }
  ];

  useEffect(() => {
    if (ancillaryServices.length === 0) {
      dispatch(loadAncillaryServices());
    }
  }, [ancillaryServices.length, dispatch]);

  function handleSave(ancillaryService) {
    dispatch(saveAncillaryService(ancillaryService));
  }

  async function handleDeleteAncillaryService(ancillaryService) {
    await dispatch(deleteAncillaryService(ancillaryService));
  }

  return (
    <MaterialTable
      style={{ backgroundColor: "whitesmoke" }}
      title="Manage AncillaryService"
      columns={columns}
      data={ancillaryServices}
      options={{
        actionsColumnIndex: -1,
        filtering: true,
        cellStyle: {
          backgroundColor: "#039be5",
          color: "#FFF"
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
            handleDeleteAncillaryService(oldData);
          })
      }}
    />
  );
}

ManageAncillaryServicePage.propTypes = {
  ancillaryServices: propTypes.array.isRequired,
  loadAncillaryServices: propTypes.func.isRequired,
  saveAncillaryService: propTypes.func.isRequired,
  deleteAncillaryService: propTypes.func.isRequired
};
export default ManageAncillaryServicePage;
