import axios from "axios";
import { Baseurl } from "./api/Baseurl";
import getCookie from "./getCookie";

export const RefreshToken = async () => {
  const accessToken = getCookie("accessToken");
  console.log("Current Access Token:", accessToken);

  try {
    const response = await axios.get(`${Baseurl}/refresh`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      xsrfCookieName: "accessToken"
    });

    if (response.data) {
      console.log("API Response:", response.data);
      const newToken = response.data?.token;
      if (newToken) {
        document.cookie = `accessToken=${newToken}; Secure; SameSite=None`;
        console.log("New Access Token:", newToken);
      }
    } else {
      console.log("API Response Status:", response.status);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
