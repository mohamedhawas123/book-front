import React, {Compoent} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
// import {logout} from '../store/actions/user'
// import SearchBox from './searchbox'
import {Route} from 'react-router-dom'
import {signOut} from '../store/action/auth'



const Header = ({history, location}) =>  {

    const dispatch = useDispatch()
    const handoeSignOut = async () => {
        
       await dispatch(signOut())
       window.location.reload()
    }
    
       


        const user = useSelector(state => state.user)

        const userInfo =  JSON.parse(localStorage.getItem('user')) 

        console.log(user)
       

        return (
            <Navbar bg="dark" variant='dark' expand ="lg" collapseOnSelect>
                <Container className='d-flex justify-content-center align-items-center'>
                    <LinkContainer to="/" className='me-auto'>
                    <Navbar.Brand>Let's make reading more fun</Navbar.Brand>
                    </LinkContainer>

                    {userInfo !== null && <div>
                        <LinkContainer to="/home">
                    <Navbar.Brand>Home</Navbar.Brand>
                    </LinkContainer>

                    <div>
          <LinkContainer onClick={handoeSignOut}  to="/signin">
            <Navbar.Text>Sign Out</Navbar.Text>
          </LinkContainer>
        </div>
                    </div> }

                   


                   {userInfo == null ? ( <LinkContainer to="/signIn" >
                        <Nav.Link className='bg-dark text-white'> Sign in</Nav.Link>
                        </LinkContainer>) : <div></div>}
                    

                    
                      
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
               
                </Container>
              
                
            </Navbar>
        )
    
}

export default Header 