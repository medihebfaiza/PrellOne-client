import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Jumbotron, Row, Card, CardBody,
    CardTitle, Col} from 'reactstrap'
import PropTypes from  'prop-types'
import AddBoard from '../containers/AddBoard.container'


const Home = ({boards, openModalCreateBoard}) => (
        <div>
            <Container style={{maxWidth:"100%"}}>
            <header>
                    <h1>Boards</h1>
            </header> 
                <Row>
                    {boards.map(board => (
                        <Col xs="12" sm="6" md="3" lg="2"> 
                            <Card key={board.id} className="bg-light mb-3">
                                <CardBody>
                                    <CardTitle>
                                    <Link  to={"/board/"+board.id}>
                                        {board.title}
                                    </Link>    
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>  
                    ))}
                    <Col xs="12" sm="6" md="3" lg="2"> 
                        <Card onClick={() => openModalCreateBoard()} className="card text-white bg-primary mb-3">
                            <CardBody>
                                <CardTitle>
                                    Create a board...
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <AddBoard/>
                    </Col>
                </Row>
            </Container>
        </div>
    )

Home.propTypes={
    openModalCreateBoard: PropTypes.func.isRequired,
      
}
    
export default Home;