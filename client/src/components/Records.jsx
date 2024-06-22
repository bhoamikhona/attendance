import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

function Records() {
  const [userData, setUserData] = useState({});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(() => data);

    if (data && data.email) {
      fetchRecords(data.email);
    }
  }, []);

  const fetchRecords = async function (email) {
    try {
      const res = await axios.get(`/records?email=${email}`);
      if (res.data.success) {
        setRecords(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sign In</th>
            <th>Sign Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.signin}</td>
              <td>{record.signout}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Records;
