let fetchEverything = url => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);

      let books = data.books;
      makeBookGrid(books);
      createEvent(books);
      loadingData();
      //modalGetting(books);
    })
    .catch(error => {
      console.log(error);
    });
};
fetchEverything("https://api.myjson.com/bins/zyv02");

const makeBookGrid = obj => {
  let container = document.getElementById("bookcontainer");
  container.innerHTML = "";
  for (i = 0; i < obj.length; i++) {
    let flipCard = document.createElement("div");
    flipCard.setAttribute("class", "flip-card col-md-6  col-lg-4  col-12");
    let flipCardInner = document.createElement("div");
    flipCardInner.setAttribute("class", "flip-card-inner");
    let flipCardFront = document.createElement("div");
    flipCardFront.setAttribute("class", "flip-card-front");
    let img = document.createElement("img");
    img.setAttribute("src", obj[i].cover);
    img.setAttribute("class", "img-thumbnail");
    //back side of card
    let flipCardBack = document.createElement("div");
    flipCardBack.setAttribute("class", "flip-card-back");
    let title = document.createElement("h3");
    title.innerText = obj[i].title;
    let description = document.createElement("p");
    description.innerText = obj[i].description;

    // make modal as we go along
    let myModal = document.createElement("div");
    myModal.setAttribute("class", "modal");
    myModal.setAttribute("id", "myModal" + i);
    let modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");
    let modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");
    let closeSpan = document.createElement("span");
    closeSpan.setAttribute("class", "close");
    closeSpan.innerHTML = "&times";
    closeSpan.addEventListener("click", () => {
      myModal.style.display = "none";
    });
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "consBtn btn btn-outline-secondary");

    nextBtn.setAttribute("id", "myButton=" + i);
    nextBtn.innerText = "Next";
    nextBtn.addEventListener("click", e => {
      carousel(e, 1, obj, myModal);
    });
    let prevBtn = document.createElement("button");
    prevBtn.setAttribute("class", "consBtn btn btn-outline-secondary");

    prevBtn.setAttribute("id", "myButton=" + i);
    prevBtn.innerText = "Previous";
    prevBtn.addEventListener("click", e => {
      carousel(e, -1, obj, myModal);
    });
    let detailImg = document.createElement("img");
    detailImg.setAttribute("src", obj[i].detail);
    modalContent.appendChild(closeSpan);
    modalHeader.appendChild(prevBtn);
    modalHeader.appendChild(nextBtn);

    modalContent.appendChild(modalHeader);

    modalContent.appendChild(detailImg);
    myModal.appendChild(modalContent);
    container.appendChild(myModal);

    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-secondary");
    button.setAttribute("data-url", obj[i].detail);
    button.setAttribute("id", "a" + i);
    button.addEventListener("click", e => {
      myModal.style.display = "block";
      window.addEventListener("click", event => {
        if (event.target == myModal) {
          myModal.style.display = "none";
        }
      });
    }); // get modal and change class to display

    button.innerText = "More Info";
    flipCardBack.appendChild(title);
    flipCardBack.appendChild(description);

    flipCardBack.appendChild(button);

    // flipCardFront.innerHTML = img;
    flipCardFront.appendChild(img);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    flipCard.appendChild(flipCardInner);
    container.appendChild(flipCard);
  }
};

const carousel = (e, direction, obj, myModal) => {
  let currentIndex = parseInt(e.target.id.split("=")[1]);

  if (direction == 1) {
    let nextIndex = currentIndex + direction;
    let nextModalId = "myModal" + nextIndex;
    if (nextIndex < obj.length) {
      document.getElementById(nextModalId).style.display = "block";
      myModal.style.display = "none";
    } else {
      nextIndex = 0;
      nextModalId = "myModal" + nextIndex;
      document.getElementById(nextModalId).style.display = "block";
      myModal.style.display = "none";
    }
  } else {
    let nextIndex = currentIndex - 1;
    let nextModalId = "myModal" + nextIndex;
    if (nextIndex >= 0) {
      document.getElementById(nextModalId).style.display = "block";
      myModal.style.display = "none";
    } else {
      nextIndex = obj.length - 1;
      nextModalId = "myModal" + nextIndex;
      document.getElementById(nextModalId).style.display = "block";
      myModal.style.display = "none";
    }
  }
};

const createEvent = obj => {
  var input = document.getElementById("search-field");
  input.addEventListener("keyup", () => {
    searchBtn(obj, input);
  });
};
const searchBtn = (obj, input) => {
  let filter = input.value.toUpperCase();
  var filteredBooks = [];
  for (var i = 0; i < obj.length; i++) {
    if (
      obj[i].title.toUpperCase().includes(filter) ||
      obj[i].description.toUpperCase().includes(filter)
    ) {
      filteredBooks.push(obj[i]);
    }
  }
  makeBookGrid(filteredBooks);
};

const loadingData = () => {
  let loading = false;
  if (loading == false) {
    loading = true;

    document.getElementById("loader").classList.add("d-none");
  }
};
