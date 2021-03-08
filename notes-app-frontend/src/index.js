const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users/`;
const NOTES_URL = `${BASE_URL}/notes/`;

const init = () => {
  fetch(NOTES_URL)
    .then((res) => res.json())
    .then((notesData) => notesData.data.forEach(note => renderNote(note)))
};

init();

function renderNote(note) {
//  console.log(note)

  const box = document.createElement("a")
  box.href = "#"

  const title = document.createElement("h2")
  title.innerText = `Title: ${note.attributes.title}`

  const content = document.createElement("p")
  content.textContent = `Content: ${note.attributes.content}`

  const time = document.createElement("p")
  time.innerText = `Time: ${note.attributes.created_at}`

  const li = document.createElement("li")
  const ul = document.createElement("ul")

  box.append(title, content, time)
  li.appendChild(box)
  ul.appendChild(li)
  document.querySelector(".note-container").appendChild(ul)

}
