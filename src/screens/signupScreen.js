import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../componets/loader'
import Message from '../componets/message'
import FormContainer from '../componets/formcontrainer'
import {userSignup} from '../store/action/auth'

const RegisterScrean = ({location, history}) => {

    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))



    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.user)
    const {loading, userInfo, error} = userRegister
    const redirect = location.search ? location.search.split('=')[1]: '/'


    useEffect(() => {
        if(user) {
            history.push('home')
        }
    }, [history, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
       const data = await dispatch(userSignup(first_name, last_name, username, password))
       if(data !== 500) {
        history.push('/home')


       }
    }


    return (
        <FormContainer>

        <h1>Sign Up</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                 type="name"
                  placeholder="Enter first name"
                  value={first_name}
                onChange={(e)=> setFirstname(e.target.value) }>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                 type="name"
                  placeholder="Enter Last name"
                  value={last_name}
                onChange={(e)=> setLastname(e.target.value) }>

                </Form.Control>
            </Form.Group>


            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                 type="name"
                  placeholder="Enter Username"
                  value={username}
                onChange={(e)=> setUsername(e.target.value) }>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>password</Form.Label>
                <Form.Control
                 type="password"
                  placeholder="Enter password"
                  value={password}
                onChange={(e)=> setPassword(e.target.value) }>

                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
                Sign UP
            </Button>


        </Form>


        <Row className="py-3">
            <Col>
            or login ? <Link to={'/signin'} > 
            Login
             </Link>
            </Col>
        </Row>

        </FormContainer>
    )
}

export default RegisterScrean