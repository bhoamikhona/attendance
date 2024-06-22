import { useEffect, useState } from "react";
import { Table, Container, Accordion } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";

function AdminRecords() {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async function () {
    try {
      const res = await axios.get("/auth/users");
      setUsers(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
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
      toast.error(error?.response?.data?.message || "Something went wrong");
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
                  <p>Loading records...</p>
                ) : records[user.email] ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Sign In</th>
                        <th>Sign Out</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records[user.email].map((record) => (
                        <tr key={record._id}>
                          <td>{record.date}</td>
                          <td>{record.signin}</td>
                          <td>{record.signout}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No records found.</p>
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
