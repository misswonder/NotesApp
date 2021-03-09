const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users/`;
const NOTES_URL = `${BASE_URL}/notes/`;

const init = () => {
  fetch(NOTES_URL)
    .then((res) => res.json())
    .then((notesData) => notesData.data.forEach((note) => renderNote(note)));
};

init();

function renderNote(note, newNote = false) {
  const element = createNoteElement(note, newNote);

  if (newNote) {
    document.querySelector(".note-container").prepend(element);
  } else {
    document.querySelector(".note-container").appendChild(element);
  }
}

function createNoteElement(note, focus = false) {
  const box = document.createElement("a");

  const title = document.createElement("h2");
  title.innerText = `Title: `;
  const titleSpan = document.createElement("span");
  titleSpan.innerText = note.attributes.title;
  titleSpan.contentEditable = true;
  titleSpan.addEventListener("input", (e) =>
    updateNote(note.id, { title: e.target.textContent })
  );
  title.appendChild(titleSpan);
  title.addEventListener("click", () => titleSpan.focus());
  box.appendChild(title);

  const content = document.createElement("p");
  content.textContent = `Content: `;
  const contentSpan = document.createElement("span");
  contentSpan.innerText = note.attributes.content;
  contentSpan.contentEditable = true;
  contentSpan.addEventListener("input", (e) =>
    updateNote(note.id, { content: e.target.textContent })
  );
  content.appendChild(contentSpan);
  content.addEventListener("click", () => contentSpan.focus());
  box.appendChild(content);

  const time = document.createElement("p");
  time.innerText = `Time: ${new Date(
    note.attributes.created_at
  ).toLocaleDateString()}`;
  box.append(time);

  const li = document.createElement("li");
  const ul = document.createElement("ul");
  ul.className = "col-md-4";

  li.appendChild(box);
  ul.appendChild(li);

  if (focus) {
    setTimeout(() => {
      titleSpan.focus();
    });
  }

  return ul;
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
