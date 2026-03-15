// // import { useNavigate } from "react-router-dom";

// // const navigate = useNavigate();

// // const logout = () => {
// //   localStorage.removeItem("token");
// //   localStorage.removeItem("user");
// //   navigate("/login");
// // };

// // export default logout;

// const logout = (navigate) => {

//   localStorage.removeItem("token");
//   localStorage.removeItem("user");

//   navigate("/login");

// };

// export default logout;


const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

export default logout;