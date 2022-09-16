window.addEventListener("load", () => {
    const form = document.getElementById("login")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        let email = document.querySelector("input[name=email]").value
        let password = document.querySelector("input[name=password]").value
        let newUser = document.querySelector("input[name=newUser]")
        let data = JSON.stringify({ "email": email, "password": password })
        console.log(data)
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }

        fetch("http://192.168.1.208/login/", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.access_token) {
                    console.log(data.access_token)
                    localStorage.setItem("token", data.access_token)
                    window.open("index.html")
                }
                else {
                    window.alert("Invalid Login")
                }
            });
    })
})