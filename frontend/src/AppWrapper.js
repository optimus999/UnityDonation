// import React, { useEffect, useContext } from "react";
// import { UserContext } from "./App"; // Update the path to your UserContext

// const AppWrapper = ({ children }) => {
//   const { dispatch } = useContext(UserContext);

//   useEffect(() => {
//     const storedPayload = localStorage.getItem("userPayload");
//     if (storedPayload === "true") {
//       dispatch({ type: "USER", payload: true });
//     }
//   }, [dispatch]);

//   return <>{children}</>; // Render the child components
// };

// export default AppWrapper;
