const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users/`;
const NOTES_URL = `${BASE_URL}/notes/`;

const loadNotes = (user) => {
  fetch(`${NOTES_URL}?user_id=${user.id}`)
    .then((res) => res.json())
    .then((notesData) => notesData.data.forEach((note) => renderNote(note)));
};

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
    updateNote(note.id, { title: e.target.innerText })
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
    updateNote(note.id, { content: e.target.innerText })
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
  time.innerText = `Created Time: ${new Date(
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
    user_id: localStorage.id,
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

  let usernameInput = event.target.username.value;

  let newUser = {
    username: usernameInput,
  };

  let reqObj = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newUser),
  };

  fetch(USERS_URL, reqObj)
    .then((res) => res.json())
    .then(({ data: user }) => {
      if (user) {
        login(user);
      }
    });
  event.target.reset();
}

function login(user) {
  localStorage.id = user.id;
  document.getElementById("user-login").style.display = "none";
  document.getElementById("user-name").textContent = user.attributes.username;
  document.getElementById("user-info").style.display = "block";
  document.getElementById("user-notes").style.display = "block";
  loadNotes(user);
}

function logout() {
  document.getElementById("user-info").style.display = "none";
  document.getElementById("user-login").style.display = "";
  localStorage.clear();
  document.querySelector(".note-container").innerHTML = "";
  document.getElementById("user-notes").style.display = "none";
}

document.getElementById("user-logout").addEventListener("click", logout);

if (localStorage.id) {
  fetch(USERS_URL + localStorage.id)
    .then((res) => res.json())
    .then(({ data: user }) => {
      if (user) {
        login(user);
      }
    });
}
