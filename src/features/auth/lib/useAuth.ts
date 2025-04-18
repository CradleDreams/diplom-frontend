import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  getUser,
  createUser,
  removeUser,
} from "../../../entities/user/model/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const login = async (email: string, password: string) => {
    try {
      await dispatch(getUser({ username: email, password })).unwrap();
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await dispatch(createUser({ username: name, email, password })).unwrap();
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    dispatch(removeUser());
  };

  return {
    user,
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    signUpName,
    setSignUpName,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    login,
    register,
    logout,
  };
};
