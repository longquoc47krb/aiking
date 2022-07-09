import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function useAuth() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [error, setError] = useState(null);

  // set user
  const setUserContext = async () => {
    return await axios
      .get("/user")
      .then((res) => {
        setUser(res.data.currentUser);
        navigate.push("/home");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  // register user
  const registerUser = async (data) => {
    console.log(data);
    const { username, email, password } = data;
    return axios
      .post("/api/v1/auth/register", {
        username,
        email,
        password,
      })
      .then(async () => {
        await setUserContext();
      })
      .catch((err) => {
        return setError(err.response.data);
      });
  };

  // login user
  const loginUser = async (data) => {
    const { email, password } = data;
    return axios
      .post("/api/v1/auth/login", {
        email,
        password,
      })
      .then(async () => {
        await setUserContext();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };
  // logout
  const logoutUser = async () => {
    try {
      await axios({
        method: "GET",
        url: `/api/v1/auth/logout`,
      }).then((res) => {
        console.log(res);
        navigate.push("/home");
      });
    } catch (err) {
      console.log(err);
    }
  };
  return { error, registerUser, loginUser, logoutUser };
}
