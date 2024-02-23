import React from "react";

async function RefreshToken(oldJwtToken, oldRefreshToken) {
  const jwtRefresh = {
    jwtToken: oldJwtToken,
    refreshToken: oldRefreshToken,
  };

  var data = "";

  await fetch("http://localhost:5056/api/Users/Refresh", {
    method: "POST",
    body: JSON.stringify(jwtRefresh),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
}

export default RefreshToken;
