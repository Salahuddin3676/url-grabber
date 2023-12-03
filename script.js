let urlList = [];

const titleInputEl = document.querySelector(".input-el1");
const urlInputEl = document.querySelector(".input-el2");
const saveBtn = document.querySelector(".save-btn");
const grabBtn = document.querySelector(".grab-btn");
const clearBtn = document.querySelector(".clear-btn");
const ulEl = document.querySelector(".ul-el");
const localStorageData = JSON.parse(localStorage.getItem("urlList"));

if (localStorageData) {
  urlList = localStorageData;
  renderUrl();
}

saveBtn.addEventListener("click", () => {
  if (urlInputEl.value) {
    let object = { title: "", url: "" };
    object.title = titleInputEl.value;
    object.url = urlInputEl.value;
    urlList.push(object);
  }
  titleInputEl.value = "";
  urlInputEl.value = "";
  localStorage.setItem("urlList", JSON.stringify(urlList));
  renderUrl();
});

grabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let object = { title: titleInputEl.value, url: tabs[0].url };
    urlList.push(object);
    titleInputEl.value = "";
    urlInputEl.value = "";
    localStorage.setItem("urlList", JSON.stringify(urlList));
    renderUrl();
  });
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  urlList = [];
  renderUrl();
});

function renderUrl() {
  let listItems = "";
  for (let i = 0; i < urlList.length; i++) {
    listItems += `
                  <li> <span>${urlList[i].title}${
      urlList[i].title ? ":" : ""
    }</span>
                    <a target="_blank" href="${urlList[i].url}" >
                        ${urlList[i].url}
                    </a>
                  </li>
    `;
  }
  ulEl.innerHTML = listItems;
}
