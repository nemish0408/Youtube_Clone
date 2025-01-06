import React, { useEffect, useState } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const GoogleOneTap = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Conditionally invoke useGoogleOneTapLogin only if user is not logged in
  const googleOneTapLogin = useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log("Google One Tap login success:", credentialResponse);

      // Decode the JWT to extract user information
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log("Decoded Token:", decodedToken);

      navigate("/")
      localStorage.setItem("user", JSON.stringify(decodedToken));
      localStorage.setItem(
        "token",
        JSON.stringify(credentialResponse.credential)
      );
      setUser(decodedToken); // Update the state with the user data
    },
    onError: (error) => {
      console.error("Google One Tap login error:", error);
    },
    googleAccountConfigs: {
      client_id:
        "790030640984-t0lrcbl9nnbohd2no6dm1oi72cdob5p4.apps.googleusercontent.com",
    },
  });

  // console.log(user);
  useEffect(() => {
    if (!user) {
      console.log("Waiting for Google One Tap login...");
    }
  }, [user]);

  return googleOneTapLogin
};

export default GoogleOneTap;
