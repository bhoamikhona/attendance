import { useEffect, useState } from "react";
import { Container, Accordion } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import RecordsTable from "../components/RecordsTable.jsx";
import Loader from "../components/Loader.jsx";

function AdminRecords() {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async function () {
    try {
      setLoading(true);
      const res = await axios.get("/auth/users");
      setUsers(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async function (email) {
    try {
      setLoading(true);
      const res = await axios.get(`/records?email=${email}`);
      if (res.data.success) {
        setRecords((prevRecords) => ({
          ...prevRecords,
          [email]: res.data.data,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="my-3">
      <h2>Admin Records</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Accordion>
          {users.map((user) => (
            <Accordion.Item
              key={user._id}
              eventKey={user._id}
              onClick={() => fetchRecords(user.email)}
            >
              <Accordion.Header>
                <span className="username">{user.name}</span>
              </Accordion.Header>
              <Accordion.Body>
                {loading ? (
                  <Loader />
                ) : records[user.email] ? (
                  <>
                    <RecordsTable records={records[user.email]} />
                  </>
                ) : (
                  <p className="text-danger">No records found.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}

export default AdminRecords;
