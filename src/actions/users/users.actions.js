import axios from "axios";
import { GET_USERS } from "./actions-type";

export const getUsers = () => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/all`)
        .then((res) => {
          dispatch({ type: GET_USERS, payload: res.data.users });
        })
        .catch((err) => console.log(err));
    };
  };