import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import InputText from "../components/InputText";
import logo from "../images/logo.png";
import { LoginAPI } from "../API";

function Login() {
  const navigate = useNavigate();
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    emailErr: "",
    paswordErr: "",
  });
  const [apiErr, setApiErr] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage({
      emailErr: "",
      paswordErr: "",
    });
    if (loginObj.emailId.trim() === "")
      return setErrorMessage({
        emailErr: "Email Id is required!",
        paswordErr: "",
      });
    if (loginObj.password.trim() === "")
      return setErrorMessage({
        paswordErr: "Password is required!",
        emailErr: "",
      });
    else {
      setLoading(true);
      await fetch(LoginAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginObj.emailId,
          password: loginObj.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message === "Authenticated successfully" &&
            data?.data?.user?.role === "9"
          ) {
            localStorage.setItem("token", data?.data?.token);
            navigate("/super_admin/dashboard");
          } else if (data.error) {
            setApiErr(data.error);
          }
        });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/super_admin/dashboard");
    }
  }, []);

  return (
    <div>
      <div className="flex flex-auto flex-col justify-center items-center h-[100vh]">
        <div className="w-2/3 md:w-2/4 lg:w-2/6 space-y-5">
          <div className="w-full flex justify-center">
            <img alt="logo" src={logo} className="w-52" />
          </div>
          <div className="">
            <h2 className="text-2xl font-bold">
              Welcome To Chahat Namkeen Admin
            </h2>
            <p className="text-gray-700">
              Please enter your credentials to sign in!
            </p>
          </div>
          <div className="">
            <form action="">
              <div className="mb-6 space-y-5">
                <InputText
                  type="text"
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="email"
                  value={loginObj.emailId}
                  onChange={(e) => {
                    setApiErr("");
                    setErrorMessage({
                      emailErr: "",
                      paswordErr: "",
                    });
                    setLoginObj({ ...loginObj, emailId: e.target.value });
                  }}
                  error={errorMessage.emailErr ? true : false}
                  errorText={errorMessage.emailErr}
                />
                <InputText
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  placeholder="Password"
                  value={loginObj.password}
                  onChange={(e) => {
                    setApiErr("");
                    setErrorMessage({
                      emailErr: "",
                      paswordErr: "",
                    });
                    setLoginObj({ ...loginObj, password: e.target.value });
                  }}
                  error={errorMessage.paswordErr ? true : false}
                  errorText={errorMessage.paswordErr}
                />
              </div>
              {apiErr && <p className="text-red-500 text-sm">{apiErr}</p>}
              {loading ? (
                <div className="w-full flex justify-center">
                  <div className="w-20">
                    <Loading />
                  </div>
                </div>
              ) : (
                <button
                  onClick={submitForm}
                  className="cursor-pointer py-2 px-4 block mt-6 bg-primaryColor text-white font-bold w-full text-center rounded"
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
