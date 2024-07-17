document
  .getElementById("noteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const content = document.getElementById("content").value;
    const ref = document.getElementById("ref").value;
    const date = document.getElementById("date").value;

    const note = { content, ref, date };
    addNoteToLocalStorage(note);
    displayNotes();
    this.reset();
  });

function addNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = `
            <div class="note-sec"><span style="color:rgb(188, 188, 188); font-size:12px">Content</span> </br/><h5>${note.content} </h5>   </div>
    <div style="display: flex;flex-wrap: wrap; justify-content: space-between; gap: 10px; color:rgb(188, 188, 188); font-size:12px">
        <div>Reference:${note.ref}</div>
        <div>Date: ${note.date} </div>
    </div>

            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
    notesList.appendChild(noteDiv);
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

// Display notes on page load
document.addEventListener("DOMContentLoaded", displayNotes);
