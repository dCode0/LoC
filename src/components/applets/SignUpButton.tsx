import React from "react";
import {Button, Checkbox, Container, Form, Icon, Modal} from "semantic-ui-react";
import LoginButton from "./LoginButton";

const modalButton = (
    <Button color={"green"} size={"massive"}>
        Sign up
    </Button>);

const SignUpButton = () => {
    return (
        <Modal trigger={modalButton} closeIcon={<Icon name={"close"}/>} size={"small"}
               style={{maxWidth: 400, height: 500}}>
            <Modal.Header as={Container} textAlign={"center"}>Sign up with your email
                address</Modal.Header>
            <Modal.Content>
                <Form size={"big"}>
                    <Form.Input label='Email' type='email' fluid/>
                    <Form.Input label='Enter Password' type='password' fluid/>
                    <Form.Input label='Confirm Password' type='password' fluid/>

                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions'/>
                    </Form.Field>
                    <Container textAlign={"center"}>
                        <Button type={"submit"} color={"green"} size={"big"}>
                            Sign up
                        </Button>
                        <p>Already have an account?</p>
                        <LoginButton/>
                    </Container>
                </Form>
            </Modal.Content>
        </Modal>
    )
};

export default SignUpButton;