import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../context/AppContext.js";
import { Container, Button } from "react-bootstrap";
import RecordsTable from "../components/RecordsTable.jsx";
import { FaClock } from "react-icons/fa";
import { getTime, getDate } from "../utils/helpers.js";

function Home() {
  const { user, handleSignIn, handleSignOut, records, loading } =
    useContext(AppContext);

  return (
    <Container className="my-3">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="username">{user?.name || "name"}</h1>
        <div className="action">
          {!user.isSignedIn ? (
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
      <RecordsTable records={records} loadin={loading} />
    </Container>
  );
}

export default Home;
