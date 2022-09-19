window.addEventListener("load", () => {
  const form = document.getElementById("login");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = document.querySelector("input[name=email]").value;
    let password = document.querySelector("input[name=password]").value;
    let newUser = document.querySelector("input[name=newUser]");
    let data = JSON.stringify({ email: email, password: password });
    // console.log(data);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
    };

    if (newUser.checked) {
      fetch("http://192.168.1.208/users/", {
        method: "POST",
        headers: headers,
        body: data,
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            window.alert("Email already in use!");
            return;
          }
        })
        .then(function (data) {
          if (data) {
            console.log("New User Created\n", data);
            window.alert("New User Saved! Logging in...");
          }
        });
    }

    setTimeout(console.log("Logging in..."), 1500);

    fetch("http://192.168.1.208/login/", {
      method: "POST",
      headers: headers,
      body: data,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.access_token) {
          //   console.log(data.access_token);
          localStorage.setItem("token", data.access_token);
          window.location.href = "index.html";
        } else {
          window.alert("Invalid Login");
        }
      });
  });
});
