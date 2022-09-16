
function getMemes(limit = 25, skip = 175) {
    let memeArr = []
    fetch(`http://192.168.1.208/memes/?limit=${limit}&skip=${skip}`, {
        method: "GET",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((res) => {
            // console.log(res[0].url);
            for (let i = 0; i < res.length; i++) {
                memeArr.push(res[i].url);
                // console.log(res[i].url)
            }
        });
    // console.log(typeof (memeArr))
    return memeArr

}

function logout() {
    localStorage.clear()
}

window.addEventListener("load", function () {
    let memes = getMemes()
    let token = localStorage.getItem("token")
    let current = 0
    let skip = 175
    const img = document.getElementById("image")
    const backBtn = document.getElementById("back")
    const nextBtn = document.getElementById("next")
    const linksDiv = document.getElementById("links")

    if (token) {
        console.log("token:", token);
        linksDiv.innerHTML = `
        <li class="nav-item">
        <a class="nav-link" id="myMemesLink" href="mymemes.html">My Memes</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" id="logout" href="" onclick="logout()">Logout</a>
        </li>`
    } else {
        linksDiv.innerHTML = `<a class="nav-link" id="loginLink" href="login.html">Login</a>`
    }

    setTimeout(function () {
        // console.log(typeof (memes))
        // console.log(memes)
        img.src = memes[current]
    }, 1000)

    backBtn.addEventListener("click", function () {
        current -= 1;
        if (current < 0) {
            current = 0;
        } else {
            img.src = memes[current]
        }
    });

    nextBtn.addEventListener("click", function () {
        current += 1
        // console.log(current)
        if (current >= memes.length - 1) {
            let limit = 25
            skip += 25
            let moreMemes = getMemes(limit, skip)
            setTimeout(function () {
                memes = memes.concat(moreMemes)
            }, 1000)
            // console.log(memes)
        };

        if (current !== memes.length) {
            img.src = memes[current];
        };

    });

});