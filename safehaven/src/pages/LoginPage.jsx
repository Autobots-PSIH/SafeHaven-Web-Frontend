import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

import { Header } from "../components/Header";
import axios from "axios";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MjI1Y2U3LTRiZjEtNGZiNy04MzViLTA4ZjQwNjkyZWExNSIsImV4cCI6MTY5NDc3OTU5N30.5rKIKtciUqRvU3YSdB0OFTnRjgx_Wl39RNBXqo50VcU";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(
    () => console.log(props.isLoggedIn, props.accessToken),
    [props.isLoggedIn]
  );
  const login = async () => {
    username !== "" && password !== ""
      ? axios
          .post(
            "https://disastro-temp-production.up.railway.app/api/auth/login-admin/",
            {
              username: username,
              password: password,
            },
            config
          )
          .then((res) =>
            res.status === 200
              ? (toast.success("Successfully logged in!", {
                  autoClose: 1000,
                  position: toast.POSITION.BOTTOM_CENTER,
                }),
                props.setIsLoggedIn(true),
                setTimeout(() => {
                  navigate("/");
                }, 2000),
                props.setAccessToken(res.data.access_token),
                localStorage.setItem("accessToken", res.data.access_token))
              : console.log("error")
          )
          .catch((err) => {
            err.response.status === 403
              ? toast.error("Invalid credentials!", {
                  autoClose: 1000,
                  position: toast.POSITION.BOTTOM_CENTER,
                })
              : console.log(err.response.status);
          })
      : toast.warning("Fill the required details", {
          autoClose: 1000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
  };

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <img src={logo} width={100} />
            </div>
            <h1 className="text-center text-5xl font-bold leading-tight text-black">
              SafeHaven.
            </h1>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    Email address *
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      value={username}
                      onInput={(e) => {
                        setUsername(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      Password *
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onInput={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    onClick={login}
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Login
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}