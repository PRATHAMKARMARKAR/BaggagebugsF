import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ProductionApi, LocalApi } from "../../../utills";
import { ToastContainer , toast } from "react-toastify";
const GoogleIcon = () => <span className="googleimg"></span>;
const FacebookIcon = () => <span className="fbimg"></span>;
const StoreIcon = () => <span className="bimg"></span>;

const SocialButton = ({ icon, text, onClick, className }) => (
  <button
    className={`flex items-center gap-10 p-3 w-full border border-[#28d3fa] bg-white rounded-lg text-black transition max-w-xs ${
      className || ""
    }`}
    onClick={onClick}
  >
    {icon} {text}
  </button>
);

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const isPartner = useSelector((state) => state.partner.isPartner);
  const handleRegister = () => navigate("/register");
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Redux isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post(
      `${ProductionApi}/user/login`,
      { email, password },
      { withCredentials: true }
    );

    const { token, role } = response.data;

    dispatch({ type: "login/login", payload: true }); // ✅ Set Redux login state
    toast.success("Login successful!");
    localStorage.setItem("role", role);

    // ✅ Admin check — navigate accordingly
    if (email === "admin@gmail.com") {
      
      navigate(`/superAdminpartner?token=${token}&role=${role}`);
      console.log("admin");
      
    } else {
      navigate(`/landingpage?token=${token}&role=${role}`);
    }

    console.log(response.data);
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Login failed");
    } else {
      setError("An error occurred. Please try again.");
    }
    toast.error("Login failed!");
  }
};


  return (
    <div className="login-main flex flex-col md:flex-row w-full h-auto overflow-y-auto md:h-screen md:overflow-hidden">
      {/* LEFT SIDE */}
      <div className="left-pane md:w-[30%] w-full  md:h-full relative bg-[#FA8128] flex items-center justify-center overflow-hidden">
        <div className="globeimg absolute top-10 left-0 md:w-[60%] md:h-[60%] w-1/2 h-1/2 opacity-50 z-0" />
        <div className="passport-img absolute z-10 hidden md:block" />
      </div>

      {/* RIGHT SIDE */}
      <div className="right-pane md:w-[70%] w-full bg-[#fefefe] relative flex items-start justify-start p-6 md:p-10 overflow-hidden **overflow-y-auto**">
        <div className="map absolute top-0 left-0 w-full h-full opacity-70 z-0" />
        <div className="map-wrapper w-full max-w-xl relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center w-full mb-10 px-4">
            <h1 className="text-3xl md:text-3xl font-bold flex gap-2">
              <span className="text-[#FA8128]">Hello,</span>
              <span className="text-[#28d3fa]">bagpacker</span>
            </h1>

            <button
              onClick={() => navigate("/landingpage")}
              className="text-4xl md:text-3xl text-black ml-20 "
            >
              ×
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl md:text-2xl text-black mb-2">Login</h2>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-[300px] p-2 rounded-lg border-2 border-[#63C5DA] text-gray-700 focus:ring-2 focus:ring-[#FA8128] outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full md:w-[300px] p-2 rounded-lg border-2 border-[#63C5DA] text-gray-700 focus:ring-2 focus:ring-[#FA8128] outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-black underline cursor-pointer text-sm max-w-[300px]">
              Forgot password?
            </p>

            <button
              type="submit"
              className="bg-[#FA8128] cursor-pointer hover:bg-[#f77a20] text-white text-lg py-2 px-6 rounded-3xl w-full md:max-w-[300px] border-4 border-[#FFA480] mt-2"
            >
              Login
            </button>

            <div className="flex space-x-1 ml-0 md:ml-24 max-w-[300px]">
              <p className="text-black text-sm">no account?</p>
              <span
                onClick={handleRegister}
                className="underline text-[#FA8128] text-sm cursor-pointer"
              >
                Register
              </span>
            </div>
          </form>

          <div className="space-y-3 mt-6 md:w-[300px]">
            <SocialButton
              icon={<GoogleIcon />}
              text="Continue with Google"
              onClick={() => {
                window.location.href = `${ProductionApi}/user/auth/google`;
                
              }}
              className="w-full"
            />
            <SocialButton
              icon={<FacebookIcon />}
              text="Continue with Facebook"
              className="cursor-pointer w-full"
            />
            <SocialButton
              icon={<StoreIcon />}
              text="Store Baggage"
              className="cursor-pointer w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
