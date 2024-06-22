// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Container, Table, Button } from "react-bootstrap";
// import { FaClock } from "react-icons/fa";
// import toast from "react-hot-toast";

// function Home() {
//   const [userData, setUserData] = useState({});
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");

//   const fetchData = function () {
//     const data = JSON.parse(localStorage.getItem("userInfo"));
//     setUserData(() => data);
//   };

//   const getDate = function () {
//     const currentDate = new Date();

//     let day = currentDate.getDate();
//     let month = currentDate.getMonth() + 1;
//     let year = currentDate.getFullYear();

//     setDate(() => `${day}-${month}-${year}`);
//   };

//   const getTime = function () {
//     const currentTime = new Date();

//     let hours = currentTime.getHours();
//     let minutes = currentTime.getMinutes();
//     let seconds = currentTime.getSeconds();
//     let ampm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     setTime(() => `${hours}:${minutes}:${seconds} ${ampm}`);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSignIn = async function () {
//     getDate();
//     getTime();
//     try {
//       const res = await axios.post("/records/record", {
//         ...userData,
//         time,
//         date,
//       });
//       console.log(res);
//       if (res) {
//         toast.success(res.data.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleSignOut = function () {};

//   return (
//     <Container className="my-3">
//       <div className="d-flex align-items-center justify-content-between">
//         <h1 className="username">{userData?.name || "name"}</h1>

//         <div className="action ">
//           {!userData.isSignedIn ? (
//             <Button
//               onClick={handleSignIn}
//               className="d-flex align-items-center gap-2"
//             >
//               <FaClock />
//               <span>Sign In</span>
//             </Button>
//           ) : (
//             <Button
//               onClick={handleSignOut}
//               className="d-flex align-items-center gap-2"
//             >
//               <FaClock />
//               <span>Sign Out</span>
//             </Button>
//           )}
//         </div>
//       </div>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Sign In</th>
//             <th>Sign Out</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>22-03-2024</td>
//             <td>07:00:00 AM</td>
//             <td>05:00:00 PM</td>
//           </tr>
//           <tr>
//             <td>22-03-2024</td>
//             <td>07:00:00 AM</td>
//             <td>05:00:00 PM</td>
//           </tr>
//           <tr>
//             <td>22-03-2024</td>
//             <td>07:00:00 AM</td>
//             <td>05:00:00 PM</td>
//           </tr>
//           <tr>
//             <td>22-03-2024</td>
//             <td>07:00:00 AM</td>
//             <td>05:00:00 PM</td>
//           </tr>
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default Home;

import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

function Home() {
  const [userData, setUserData] = useState({});
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignIn = async function () {
    const currentDate = getDate();
    const currentTime = getTime();
    setDate(currentDate);
    setTime(currentTime);

    try {
      const res = await axios.post("/records/record", {
        email: userData.email,
        time,
        date,
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

  const handleSignOut = async function () {};

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sign In</th>
            <th>Sign Out</th>
          </tr>
        </thead>
        <tbody>
          {/* Example data, replace with dynamic data */}
          <tr>
            <td>22-03-2024</td>
            <td>07:00:00 AM</td>
            <td>05:00:00 PM</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
