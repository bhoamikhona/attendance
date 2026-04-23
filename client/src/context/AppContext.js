import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getDate, getTime } from "../utils/helpers.js";

// axios.defaults.baseURL =
// process.env.NODE_ENV === "production"
// ? "https://attendance-p21a.onrender.com/api/v1"
// : "http://localhost:8000/api/v1";

axios.defaults.baseURL = "https://attendance-p21a.onrender.com/api/v1";

export const AppContext = createContext();

export const AppProvider = function ({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const fetchRecords = async function (email) {
    try {
      setLoading(true);

      const res = await axios.get(`/records?email=${email}`);
      if (res.data.success) {
        setRecords(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async function (email, password) {
    try {
      const res = await axios.post("/auth/login", { email, password });

      if (res.data.success) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        setUser(res.data.data);
        toast.success(res.data.message);
        navigate("/");
        fetchRecords(res.data.data.email);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const registerUser = async function (name, email, password) {
    console.log(email, name, password);
    try {
      const res = await axios.post("/auth/register", { name, email, password });
      console.log(res);

      if (res) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        navigate("/");
        setUser(res.data.data);
        fetchRecords(res.data.data.email);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const logoutUser = async function () {
    try {
      const res = await axios.post("/auth/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.removeItem("userInfo");
        setUser();
        setRecords([]);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getUser = async function (id) {
    try {
      setLoading(true);
      const res = await axios.get(`/auth/user/${id}`);
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sign in
  const handleSignIn = async () => {
    const currentDate = getDate();
    const currentTime = getTime();

    try {
      const res = await axios.post("/records/record", {
        email: user.email,
        time: currentTime,
        date: currentDate,
      });
      if (res.data.success) {
        setUser({ ...user, isSignedIn: true });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...user, isSignedIn: true }),
        );
        toast.success("Sign In Successful");
        fetchRecords(user.email);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // Function to handle sign out
  const handleSignOut = async () => {
    const currentDate = getDate();
    const currentTime = getTime();

    try {
      const res = await axios.put(`/records/record`, {
        email: user.email,
        time: currentTime,
        date: currentDate,
      });
      if (res.data.success) {
        setUser({ ...user, isSignedIn: false });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...user, isSignedIn: false }),
        );
        toast.success(res.data.message);
        fetchRecords(user.email);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getAllUsers = async function () {
    try {
      setLoading(true);
      const res = await axios.get("/auth/users");
      setAllUsers(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo && storedUserInfo._id) {
      setUser(storedUserInfo);
      fetchRecords(storedUserInfo.email);
      if (storedUserInfo.isAdmin) {
        getAllUsers();
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        records,
        setRecords,
        loading,
        setLoading,
        fetchRecords,
        loginUser,
        getUser,
        logoutUser,
        handleSignIn,
        handleSignOut,
        allUsers,
        registerUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
