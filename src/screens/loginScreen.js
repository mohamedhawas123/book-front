

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../componets/loader'
import Message from '../componets/message'
import {userLogin} from '../store/action/auth'
import FormContainer from '../componets/formcontrainer'


const LoginScrean = ({location, history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('user'))



    const userLoginData = useSelector(state => state.user)
    const {loading, userInfo, error} = userLoginData

    const redirect = location.search ? location.search.split('=')[1]: '/'
    useEffect(() => {
        console.log(`here is user ${user}`)
        if(user) {
            history.push('home')
        }
    }, [history, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
      const data =  await dispatch(userLogin(email, password))
      console.log(data);
      if(data != 500) {
        history.push('/home')
      }
    }


    return (
        <FormContainer>

        <h1>Sign In</h1>
        {error && <Message variant="danger">Please check your password or username</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                 type="username"
                  placeholder="Enter username"
                  value={email}
                onChange={(e)=> setEmail(e.target.value) }>

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
                Sign In
            </Button>


        </Form>


        <Row className="py-3">
            <Col>
            Author  ? <Link to={redirect ? `/signup?redirect=${redirect}`: '/register'} > 
            Regsiter
             </Link>
            </Col>
        </Row>

        </FormContainer>
    )
}

export default LoginScrean