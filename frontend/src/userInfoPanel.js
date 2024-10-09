import React from "react";
import ValidateToken from "./utils/ValidateToken";
import Login from "./Login";
import { NavLink, useNavigate } from "react-router-dom";

function UserInfoPanel({ isLogin, isAdmin, setIsAdmin, setIsLogin}) {
  const navigate = useNavigate()
  setIsLogin(ValidateToken)
  if (!isLogin) {
    return (
      <>
        <Login
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </>
    );
  }

  const user = {
    name: localStorage.getItem("name"),
    userId: localStorage.getItem("userId"),
    userType: localStorage.getItem("userType"),
    email: localStorage.getItem("email"),
    mobileNo: localStorage.getItem("mobileNo"),
  };
  let sortName = (name) => {
    if (name.indexOf(" ") !== -1) {
      return name.substring(0, name.indexOf(" ") + 1);
    }
    return name;
  };
  const handleLogout = () => {
    localStorage.setItem("token", "");
    setIsLogin(false);
    setIsAdmin(false);
    navigate('/login')
  };
  return (
    <div className="contentViewport userInfoPanel d-flex justify-content-center align-items-center">
      <div className="w-75 d-flex flex-column align-items-center gap-2 pt-5">
        <h1><u>Hello, {sortName(localStorage.getItem("name"))}</u></h1>
        <div className="w-100 UserDetailsTable">
          <div className="w-100 d-flex flex-row-reverse">
            <NavLink
              role="button"
              to="/user/details/update"
              className="text-white fs-6"
            >
              Edit Details
            </NavLink>
          </div>
          <table
            className={`w-100 text-center fs-5`}
          >
            <thead>
              <th colSpan={2} className="fs-4">
                Your Details
              </th>
            </thead>
            <tbody>
              <tr>
                <td>Your Name : </td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>User ID : </td>
                <td>{user.userId}</td>
              </tr>
              <tr>
                <td>Mobile No. : </td>
                <td>{user.mobileNo}</td>
              </tr>
              <tr>
                <td>Email Address : </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <NavLink to='/user/details/userIdUpdate' className='text-white'>User ID reset</NavLink>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                <NavLink to='/user/details/userPWUpdate' className='text-white'>Password reset</NavLink>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button
                    type="button"
                    className={`btn btn-primary${
                      isLogin ? "" : "visually-hidden"
                    }`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPanel;
