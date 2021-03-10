const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users/`;
const NOTES_URL = `${BASE_URL}/notes/`;

const init = () => {
  fetch(NOTES_URL)
    .then((res) => res.json())
    .then((notesData) => notesData.data.forEach((note) => renderNote(note)));
};

init();

function renderNote(note, focus = false) {
  const card = document.createElement("div");
  card.className = "note-card";

  const delBtn = document.createElement("button");
  delBtn.className = "style-button";
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", (e) => {
    deleteNote(note);
  });

  const title = document.createElement("h2");
  title.className = "title";
  title.innerText = `Title: `;
  const titleSpan = document.createElement("span");
  titleSpan.className = "input-span";
  titleSpan.innerText = note.attributes.title;
  titleSpan.contentEditable = true;
  titleSpan.addEventListener("input", (e) =>
    updateNote(note.id, { title: e.target.textContent })
  );
  titleSpan.addEventListener("focus", () => {
    title.className = "title input-focus";
    card.className = "note-card card-focus";
  });
  titleSpan.addEventListener("blur", () => {
    title.className = "title";
    card.className = "note-card";
  });
  title.appendChild(titleSpan);
  title.addEventListener("click", () => titleSpan.focus());
  card.appendChild(title);

  const content = document.createElement("p");
  content.className = "content";
  content.textContent = `Content: `;
  const contentSpan = document.createElement("span");
  contentSpan.className = "input-span";
  contentSpan.innerText = note.attributes.content;
  contentSpan.contentEditable = true;
  contentSpan.addEventListener("input", (e) =>
    updateNote(note.id, { content: e.target.textContent })
  );
  contentSpan.addEventListener("focus", () => {
    content.className = "content input-focus";
    card.className = "note-card card-focus";
  });
  contentSpan.addEventListener("blur", () => {
    content.className = "content";
    card.className = "note-card";
  });
  content.appendChild(contentSpan);
  content.addEventListener("click", () => contentSpan.focus());
  card.appendChild(content);

  const time = document.createElement("p");
  time.className = "time";
  time.innerText = `Time Created: ${new Date(
    note.attributes.created_at
  ).toLocaleDateString()}`;
  card.append(time);
  card.appendChild(delBtn);

  const wrapper = document.createElement("div");
  wrapper.className = "col-md-3";
  wrapper.dataset.id = note.id;
  wrapper.appendChild(card);

  document.querySelector(".note-container").prepend(wrapper);

  if (focus) {
    titleSpan.focus();
  }
}

function updateNote(id, note) {
  let reqObj = {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify(note),
  };

  fetch(NOTES_URL + id, reqObj);
}

function createNote() {
  let newNote = {
    title: " ",
    content: " ",
  };

  let reqObj = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newNote),
  };

  fetch(NOTES_URL, reqObj)
    .then((res) => res.json())
    .then(({ data }) => {
      renderNote(data, true);
    });
}

function deleteNote(note) {
  fetch(NOTES_URL + note.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => removeNoteElement(note.id))
    // .then(() => {
    //   document.querySelector(`ul[data-id="${note.id}"]`)?.remove();
    // })
    .catch((err) => alert("Unable to delete note."));
}

function removeNoteElement(id) {
  document.querySelector(`div[data-id="${id}"]`)?.remove();
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  //debugger

  let usernameInput = event.target.username;

  let newUser = {
    username: " ",
  };

  let reqObj = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newUser),
  };

  fetch(USERS_URL, reqObj)
    .then((res) => res.json())
    // .then(console.log("worked"))
    .then(() => {})
    // .then((usersArray) => {
    //   let user = usersArray.find(function (user) {
    //     return user.username === usernameInput.value;
    //   });
    //   if (user) {
    //     usernameInput = " ";
    //     // slapUser(user);
    //     localStorage.id = user.id;
    //     logOutButton();
    //   }
    // });
  event.target.reset;
}

form.addEventListener("submit", postFetchForSignUp);

function postFetchForSignUp(event) {
  let usernameInput = event.target.username;

  fetch(USERS_URL, {
    // First, we make a Post fetch request where we want to store our users
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      localStorage.clear(); // If there was an user signed in, this will clear
      localStorage.id = user.id; // Then we can store the id we got
      // slapUser(user);
      logOutButton();
    });
}

function logOutButton() {
  let logOutButton = document.createElement("button");
  logOutButton.className = "log-out-button";
  logOutButton.innerText = "Log Out";
  form.append(logOutButton);
  logOutButton.addEventListener("click", (e) => {
    localStorage.clear(); // We clear localStorage like so
  });
}
