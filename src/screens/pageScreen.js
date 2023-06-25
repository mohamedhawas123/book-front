import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPage, createPage, editPage, deletePage} from '../store/action/page'
import {getBook} from '../store/action/books'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Modal, Button } from "react-bootstrap";
import Loader from '../componets/loader'

const  PageScreen = ({redirect, history}) => {

  const dispatch= useDispatch()

  const {id: bookid} = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const currentUser =  JSON.parse(localStorage.getItem("user"))

  const my_book = useSelector(state => state.book.oneBook)

console.log(my_book)
  const pageContent = useSelector(state => state.page.page)
  const {load: loading, created: is_created ,deleted} = useSelector(state => state.page)





  useEffect( () => {
    if(currentUser == null) {
      history.push("/signin")
    }
    dispatch(getPage(bookid,pageNumber ))
    dispatch(getBook(bookid))
  }, [dispatch, bookid, pageNumber])


  const handleNextPage = () => {
    setPageNumber(num => num + 1)
  };

  const handlePreviousPage = () => {
    if(pageNumber <= 0 || pageNumber ===0) {
      setPageNumber(1)
    }else {
      setPageNumber(num => num - 1)

    }
    
  };

  const [showCreatePageModel, setShowCreatePageModel] = useState(false);
  const [content, setContent] = useState("");
  const handleShowCreatePageModal = (value, id) => {
    
    setShowCreatePageModel(true)
  };
  const handleClosPageModel = () => setShowCreatePageModel(false);
  const handleChangeConentPage = (event) => setContent(event.target.value);



  const [showEditPageModel, setShowEditPageModel] = useState(false);
  const [editContent, setEditContent] = useState("");
  const handleShowEditPageModal = (value, id) => {
    setEditContent(pageContent.content)
    setShowEditPageModel(true)
  };
  const handleClosEditPageModel = () => setShowEditPageModel(false);
  const handleChangeEditConentPage = (event) => setEditContent(event.target.value);
  

  
  const handleCreatePage = async () =>{
   const page =  await dispatch(createPage(bookid,content  ))
  console.log(page)
   dispatch(getPage(bookid,page.number))

    handleClosPageModel();
    setContent("")
  }

  const handleDeletePage = async () =>{
   await dispatch(deletePage(bookid,pageContent.id ))
   dispatch(getPage(bookid,1 ))


  }

  const handleEditPage = async() =>{
  await  dispatch(editPage(bookid, pageContent.id,editContent  ))
      dispatch(getPage(bookid,pageContent.number ))

    handleClosEditPageModel();
    setContent(editContent)
  }


  return (
    
    
    <>
            {loading && <Loader />}
            

  
              {my_book && my_book.author.user.username ==currentUser.username ? <div>
                <button onClick={handleShowCreatePageModal} className="btn btn-primary mr-2">Add Page</button>
      <button  onClick={handleShowEditPageModal} className="btn btn-primary m-2">Edit Page</button>
      <button  onClick={handleDeletePage} className="btn btn-danger m-2">delete Page</button>
              </div>:<div></div>
              
            
            }

   

    <div className="container-fluid bg-light pt-4 pb-4">
    {is_created ? <div className="alert alert-success" role="alert">Page created successfully</div> : null}
    {deleted ? <div className="alert alert-success" role="alert">Page deleted successfully</div> : null}

    
      <div className="jumbotron"></div>
      <div className="card">
        <div className="card-body">
          <p>{pageContent && pageContent.content}</p>
        </div>


        <Modal show={showCreatePageModel} onHide={handleClosPageModel}>
        <Modal.Header closeButton>
          <Modal.Title> Add Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="pageCreate">Create Page</label>
              <textarea
                type="text"
                className="form-control"
                id="pageCreate"
                value={content} 
                style={{ height: '400px'}}
                onChange={handleChangeConentPage}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosPageModel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreatePage}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showEditPageModel} onHide={handleClosEditPageModel}>
        <Modal.Header closeButton>
          <Modal.Title> Edit Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="editPage">Edit Page</label>
              <textarea
                type="text"
                className="form-control"
                id="editPage"
                value={editContent} 
                style={{ height: '400px'}}
                onChange={handleChangeEditConentPage}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosEditPageModel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditPage}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>



      </div>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div></>
    
  );
}

export default PageScreen;
