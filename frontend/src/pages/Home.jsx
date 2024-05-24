import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted!");
        else alert("Failed!!");
        getNotes();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    // api
    //   .delete(`/api/notes/delete/${id}/`)
    //   .then((res) => {
    //     if (res.status === 204) alert("Note deleted!");
    //     else alert("failed to delete note.");
    //   })
    //   .catch((error) => alert(error));
    // getNotes();
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Faild");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <div>
          <h2>Notes</h2>
          {notes
            ? notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
              ))
            : "No data"}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            name="content"
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <input type="submit" value="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default Home;
