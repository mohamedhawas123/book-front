import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorBooks, createBook, deleteBook, editBook } from "../store/action/books";
import BookWidget from "../componets/bookWidget";
import { Modal, Button } from "react-bootstrap";



const HomeAuthorScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const author = JSON.parse(localStorage.getItem("user"));

  console.log(author);

  const mybooks = useSelector((state) => state.book.author_books);

  const goToPage = (id) => {
    localStorage.setItem("currentBook", JSON.stringify(id))

    history.push(`${id}/page/`);
  };

  const [showModal, setShowModal] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleBookTitleChange = (event) => setBookTitle(event.target.value);



  const [bookId, setBookId] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookEditTitle, setBookEditTitle] = useState("");
  const handleShowEditModal = (value, id) => {
    setBookEditTitle(value)
    setBookId(id)
    setShowEditModal(true)
  };
  const handleClosEditeModal = () => setShowEditModal(false);
  const handleBookEditTitleChange = (event) => setBookEditTitle(event.target.value);


  


  const handleAddBook =async () => {
    console.log(bookTitle);
    handleCloseModal();
    setBookTitle("")
   await dispatch(createBook(author.author_id,bookTitle ))
    dispatch(getAuthorBooks(author.author_id))
  };

  
  const handleDelete =async (id)=>{
   await dispatch(deleteBook(id))
    dispatch(getAuthorBooks(author.author_id))

  }

  const handleEditBook = async ()=> {
   await dispatch(editBook(bookId,bookEditTitle ))
   handleClosEditeModal()

   dispatch(getAuthorBooks(author.author_id))

  }

  useEffect(() => {
    if (author === undefined || author === null) {
      history.push("/signin");
    }

    dispatch(getAuthorBooks(author.author_id));
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ marginRight: "auto" }}>Welcome! {author && author.username}</h1>
        <button
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
          onClick={handleShowModal}
        >
          Add a Book
        </button>
      </div>

      <Modal show={showEditModal} onHide={handleClosEditeModal}>
        <Modal.Header closeButton>
          <Modal.Title> Edit book Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="bookEditTitle">Book Title</label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                value={bookEditTitle} 
                onChange={handleBookEditTitleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosEditeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditBook}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="bookTitle">Book Title</label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                value={bookTitle}
                onChange={handleBookTitleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBook}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {mybooks.length === 0 ? (
        <h3>you don't have any books yet</h3>
      ) : (
        <div></div>
      )}

      <div className="container">
        <div className="row">
          {mybooks.map((book, index) => {
            return (
              <div className="col-md-4">
                <BookWidget
                  title={book.title}
                  author={book.author.user.username}
                  click={() => goToPage(book.id)
                }
                handleEdit={() => handleShowEditModal(book.title, book.id)}
                handleDelete={() => handleDelete(book.id)}
                showEdit={book.author.user.username ==author.username }
                />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeAuthorScreen;