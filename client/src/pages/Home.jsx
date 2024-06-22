import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import Records from "../components/Records.jsx";

function Home() {
  const [userData, setUserData] = useState({});
  const [records, setRecords] = useState([]);

  const fetchData = function () {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(data);
  };

  const getDate = function () {
    const currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getTime = function () {
    const currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const fetchRecords = async function () {
    try {
      const res = axios.get("/records");
      console.log(res);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // fetchRecords()
  }, []);

  const handleSignIn = async function () {
    const currentDate = getDate();
    const currentTime = getTime();

    try {
      const res = await axios.post("/records/record", {
        email: userData.email,
        time: currentTime,
        date: currentDate,
      });
      if (res.data.success) {
        setUserData({ ...userData, isSignedIn: true });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...userData, isSignedIn: true })
        );
        toast.success("Sign In Successful");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignOut = async function () {
    const currentDate = getDate();
    const currentTime = getTime();

    try {
      const res = await axios.put(`/records/record`, {
        email: userData.email,
        time: currentTime,
        date: currentDate,
      });
      if (res.data.success) {
        setUserData({ ...userData, isSignedIn: false });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...userData, isSignedIn: false })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="my-3">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="username">{userData?.name || "name"}</h1>
        <div className="action">
          {!userData.isSignedIn ? (
            <Button
              onClick={handleSignIn}
              className="d-flex align-items-center gap-2"
            >
              <FaClock />
              <span>Sign In</span>
            </Button>
          ) : (
            <Button
              onClick={handleSignOut}
              className="d-flex align-items-center gap-2"
            >
              <FaClock />
              <span>Sign Out</span>
            </Button>
          )}
        </div>
      </div>
      <Records />
    </Container>
  );
}

export default Home;
