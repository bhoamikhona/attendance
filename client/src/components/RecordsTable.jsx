import React from "react";
import { Table } from "react-bootstrap";
import Loader from "./Loader.jsx";

function RecordsTable({ records, loading }) {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Table className="my-2" striped bordered hover>
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
      )}
    </div>
  );
}

export default RecordsTable;
