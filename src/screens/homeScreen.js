import React, { useEffect, useState } from "react"
import {getBooks,  deleteBook, editBook } from '../store/action/books'
import { useDispatch, useSelector } from "react-redux"
import BookWidget from '../componets/bookWidget'
import { Modal, Button } from "react-bootstrap";
import Loader from '../componets/loader'

const HomeScreen = ({history, location}) => {

    const author = JSON.parse(localStorage.getItem("user")) 

    const dispatch = useDispatch()
    const {loading, error, books} = useSelector(state => state.book)


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



    const goToPage = (id) => {
      localStorage.setItem("currentBook", JSON.stringify(id))
        history.push(`${id}/page/`)
    }

    const handleDelete =async (id)=>{
        await dispatch(deleteBook(id))
        dispatch(getBooks())     
       }
     
       const handleEditBook = async ()=> {
        console.log(bookId)
        console.log(bookEditTitle)

        await dispatch(editBook(bookId,bookEditTitle ))
        handleClosEditeModal()
     
        dispatch(getBooks())     
       }
     

    useEffect(()=> {
     
      const fetchData = async () => {
        await dispatch(getBooks());
    };
    fetchData();
    },[] )
    return (
        
        <React.Fragment>
                      {loading && <Loader />}

                        {books.length === 0 ? <h1>Loading...</h1> : <div></div>}
                        {error&& <div>{error}</div>}

            <h1>Books</h1>

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





            <div className="container">
    <div className="row">
        {books.map((book, index) => {
            console.log(book.title)
            return (
                <div className="col-md-4">
                    <BookWidget title={book.title} author={book.author.user.username} 
                    
                    click={ () =>goToPage(book.id)} 

                    handleEdit={() => handleShowEditModal(book.title, book.id)}
                    handleDelete={() => handleDelete(book.id)}
                    showEdit={author && book.author.user.username ===author.username }
                    
                    
                    />
                </div>
            )
        })}
    </div>
</div>
        </React.Fragment>
    )
}

export default HomeScreen