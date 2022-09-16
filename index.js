// const bootstrap = require('bootstrap');

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


window.addEventListener("load", function () {
    let memes = getMemes()
    const img = document.getElementById("image")
    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')
    const modalFormButton = document.getElementById("loginButton")
    const backBtn = document.getElementById("back")
    const nextBtn = document.getElementById("next")
    const nextPageBtn = document.getElementById("nextPage")
    let current = 0
    let page = 1
    let skip = 175

    console.log(memes)

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
    })

    nextBtn.addEventListener("click", function () {
        current += 1
        console.log(current)
        if (current >= memes.length - 1) {
            let limit = 25
            skip += 25
            let moreMemes = getMemes(limit, skip)
            setTimeout(function () {
                memes = memes.concat(moreMemes)
            }, 1000)
            console.log(memes)
        }

        if (current !== memes.length) {
            img.src = memes[current]
        }
    })

    myModal.addEventListener('shown.bs.modal', () => {
        myInput.focus()
    })

    modalFormButton.addEventListener("click", function (event) {
        const email = document.querySelector("input[name=email]").value
        const password = document.querySelector("input[name=password]").value
        const headers = { "email": email, "password": password }
        console.log(headers)
        event.stopPropagation()
        event.preventDefault()
    })

})