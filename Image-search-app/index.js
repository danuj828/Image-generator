const api = "t5bQdG_QumwP5uNdFBlNo9HQl697UNDy-EC6y99zRbA";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const result = document.querySelector(".search-results");
const showButton = document.getElementById("show-more-button");

let inputData = "";
let defaultPage = 1;

async function searchImage() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${defaultPage}&query=${inputData}&client_id=${api}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (defaultPage === 1) {
    result.innerHTML = "";
  }

  results.map((item) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = item.urls.small;
    image.alt = item.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = item.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = item.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    result.appendChild(imageWrapper);
  });
  defaultPage++;
  if (defaultPage > 1) {
    showButton.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  defaultPage = 1;
  searchImage();
});

showButton.addEventListener("click", () => {
  searchImage();
});
