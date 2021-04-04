import React from "react";
import {Button, Container, Form, Icon, Modal} from "semantic-ui-react";

const modalButton = (
    <Button color={"blue"}>
        Login
    </Button>);

const LoginButton = () => {
    return (
        <Modal trigger={modalButton} closeIcon={<Icon name={"close"}/>} size={"small"}
               style={{maxWidth: 400, height: 500}}>
            <Modal.Header as={Container} textAlign={"center"}>
                To continue, log in to SoundS.
            </Modal.Header>
            <Modal.Content>
                <Form size={"big"}>
                    <Form.Input label='Email' type='email' fluid/>
                    <Form.Input label='Enter Password' type='password' fluid/>

                    <Container textAlign={"center"}>
                        <Button type={"submit"} color={"blue"}>
                            Login
                        </Button>
                        <p>Don't have an account?</p>
                        <Button color={"green"} size={"big"} href={"/"}>
                            Sign Up
                        </Button>
                    </Container>
                </Form>
            </Modal.Content>
        </Modal>
    )
};

export default LoginButton;