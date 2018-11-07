import React from 'react'
import { withRouter } from 'react-router-dom'
import { Alert, Container, Input, Button, Col, Form, FormGroup, Label, FormFeedback } from 'reactstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            validate: {
                emailState: '',
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event
        const value = target.type === 'checkbox' ? target.checked : target.value
        const { name } = target
        await this.setState({
            [name]: value,
        })
    }

    keyDown = async (event) => {
       if (event.key === "Enter" && event.keyCode === 13) this.submitForm()
    }

    submitForm = async() => {
        // e.preventDefault()
        try {
            const user = await this.props.login(this.state.email, this.state.password)
            this.props.history.push(`${user.username}/boards`)
        } 
        catch (error) { }
    }

    render() {
        const { email, password } = this.state
        return (
            <Container className="SignInUpForms">
                <h2>Sign In</h2>
                <Form className="form">
                    {this.props.error &&
                        <Alert color="danger">
                            {this.props.error}
                        </Alert>
                    }
                    {this.props.waiting &&
                        <Alert color="info">
                            {this.props.waiting}
                        </Alert>
                    }
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="email@prellone.com"
                                value={email}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={(e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                }}
                            />
                            <FormFeedback valid>
                                This email is looking good!
                            </FormFeedback>
                            <FormFeedback>
                                Doesn't look like a valid email!
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                                onKeyDown={this.keyDown}
                            />
                        </FormGroup>
                    </Col>
                    <Button onClick={this.submitForm} className="mt-2" >Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(Login)