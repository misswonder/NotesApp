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
    title.className = "input-focus";
    card.className = "note-card card-focus";
  });
  titleSpan.addEventListener("blur", () => {
    title.className = "";
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
    content.className = "input-focus";
    card.className = "note-card card-focus";
  });
  contentSpan.addEventListener("blur", () => {
    content.className = "";
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

  const li = document.createElement("li");
  const ul = document.createElement("ul");
  ul.className = "col-md-4";
  ul.dataset.id = note.id;

  card.appendChild(delBtn);
  li.appendChild(card);
  ul.appendChild(li);

  document.querySelector(".note-container").prepend(ul);

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
    .then(() => {
      document.querySelector(`ul[data-id="${note.id}"]`)?.remove();
    })
    .catch((err) => alert("Unable to delete note."));
}
