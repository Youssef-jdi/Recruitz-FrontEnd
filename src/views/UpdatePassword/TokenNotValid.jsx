import React , { Component } from 'react'
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class TokenNotValid extends Component {
    render(){
        return(
            <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="6">
                  <span className="clearfix">
                    <h4 className="pt-3">Houston, we have a problem!</h4>
                    <p className="text-muted float-left">Your token is no longer valid please contact your Admin</p>
                  </span>
                 
                </Col>
              </Row>
            </Container>
          </div>
        )
    }
}

export default TokenNotValid