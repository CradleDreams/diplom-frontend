import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  getUser,
  createUser,
  removeUser,
} from "../../../entities/user/model/userSlice";
import { genres } from "../../../shared/lib/data/genresData";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const [signInName, setSignInName] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const login = async (username: string, password: string) => {
    try {
      await dispatch(getUser({ username: username, password })).unwrap();
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await dispatch(
        createUser({ username: name, email, password, genres }),
      ).unwrap();
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
    signInName: signInName,
    setSignInName: setSignInName,
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
