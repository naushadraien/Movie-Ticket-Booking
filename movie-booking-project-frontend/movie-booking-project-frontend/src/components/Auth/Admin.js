import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions } from "../../store";
import AuthForm from "./AuthForm";
import { toast } from "react-toastify";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    // console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    // console.log("Admin", data);
    sendAdminAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => toast.error(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
