import { createContext, useEffect, useState } from "react";

const userDate = createContext();

function authContext() {
  const [data, setData] = useState({});

  return <div>context</div>;
}

export default authContext;
