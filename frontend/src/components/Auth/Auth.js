import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { userActions } from "../../store";
import AuthForm from "./AuthForm";
import { toast } from "react-toastify";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    // here data is the response from the server on successful login
    console.log(data);
    dispatch(userActions.login());
    toast.success(data.message);
    localStorage.setItem("userId", data.id);
    navigate("/");
  };
  const getData = (data) => {
    // console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
