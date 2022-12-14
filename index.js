function getMemes() {
  let memeArr = [];
  fetch(`http://192.168.1.208/memes`, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      for (i in data) {
        memeArr.push(data[i]);
      }
      return memeArr;
    });
  return memeArr;
}

function logout() {
  localStorage.clear();
}

window.addEventListener("load", function () {
  let memes = getMemes();
  let token = localStorage.getItem("token");
  let current = 0;
  const img = document.getElementById("image");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  const linksDiv = document.getElementById("links");
  const saveBtn = document.getElementById("save");

  if (token) {
    linksDiv.innerHTML = `
        <li class="nav-item">
        <a class="nav-link" id="myMemesLink" href="mymemes.html">My Memes</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" id="logout" href="" onclick="logout()">Logout</a>
        </li>`;
  } else {
    linksDiv.innerHTML = `<a class="nav-link" id="loginLink" href="login.html">Login</a>`;
  }

  setTimeout(function () {
    img.src = memes[current].url;
  }, 1000);

  backBtn.addEventListener("click", function () {
    current -= 1;
    if (current < 0) {
      current = memes.length;
      img.src = memes[current].url;
    } else {
      img.src = memes[current].url;
    }
  });

  nextBtn.addEventListener("click", function () {
    current += 1;
    if (current >= memes.length - 1) {
      current = 0
    }

    if (current !== memes.length) {
      img.src = memes[current].url;
    }
  });

  saveBtn.addEventListener("click", function () {
    let memeId = memes[current].id;
    console.log(memeId);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    fetch(`http://192.168.1.208/save/${memeId}`, {
      method: "POST",
      headers: headers,
    }).then(function (response) {
      if (response.ok) {
        window.alert("Meme Saved!");
      }
    });
  });
});
