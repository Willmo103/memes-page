function getUserMemes() {
  let memeArr = [];
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  fetch(`http://192.168.1.208/save/`, {
    method: "GET",
    headers: headers,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i in data.memes) {
        console.log(data.memes[i]);
        memeArr.push(data.memes[i]);
      }
      return memeArr;
    });
  console.log(memeArr);
  return memeArr;
}

function logout() {
  localStorage.clear();
  window.location.href("index.html");
}

window.addEventListener("load", function () {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
  let current = 0;
  let memes = getUserMemes();
  let token = localStorage.getItem("token");
  const img = document.getElementById("image");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  const linksDiv = document.getElementById("links");
  const deleteBtn = document.getElementById("save");

  if (current <= 0) {
    backBtn.style.visibility = "none";
    nextBtn.style.visibility = "visible";
  } else if (current >= memes.length) {
    backBtn.style.visibility = "visible";
    nextBtn.style.visibility = "none";
  }

  if (token) {
    linksDiv.innerHTML = `
        <li class="nav-item">
        <a class="nav-link" id="home" href="index.html">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" id="logout" href="" onclick="logout()">Logout</a>
        </li>`;
  } else {
    linksDiv.innerHTML = `<a class="nav-link" id="loginLink" href="login.html">Login</a>`;
  }

  setTimeout(function () {
    console.log(memes);
    img.src = memes[current].url;
  }, 1000);

  backBtn.addEventListener("click", function () {
    current -= 1;
    if (current < 0) {
      current = 0;
    } else {
      img.src = memes[current].url;
    }
  });

  nextBtn.addEventListener("click", function () {
    current += 1;
    if (current >= memes.length - 1) {
      let moreMemes = getUserMemes();
      setTimeout(function () {
        memes = memes.concat(moreMemes);
      }, 1000);
    }

    if (current !== memes.length) {
      img.src = memes[current].url;
    }
  });

  deleteBtn.addEventListener("click", function () {
    let memeId = memes[current].id;
    console.log(memeId);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    fetch(`http://192.168.1.208/save/${memeId}`, {
      method: "DELETE",
      headers: headers,
    }).then(function (response) {
      if (response.ok) {
        window.alert("Meme Deleted!");
        location.reload();
      }
    });
  });
});
