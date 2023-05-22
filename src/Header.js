import {
  Navbar,
  Nav,
  Container,
  Image,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import cs from "classnames";
import css from "../src/css/LandScreen.css";
import { BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import waveHeader from "../src/img/wave-header.svg";
import headerImage from "../src/img/header.svg";
import updateSoftware from "../src/img/software_update.svg";
import openSource from "../src/img/open_source.svg";
import helperPeople from "../src/img/helper_people.svg";
import HeaderCard from "../src/LandScreenComponents/HeaderCard"; 

export default function Header() {

    let navigate = useNavigate();
    const navRegister = () =>{
    let path = '/Register'
    navigate(path, { replace: true })
    navigate(0);
     }
  return (
    <header className="vh-100 text-white">
      <Image
        src={waveHeader}
        alt="Welcome Header"
        className="position-absolute w-100 header-wave"
      />
      <Navbar
        expand="lg"
        className="bg-transparent mt-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            className={cs("font-weight-bold text-white m-0 mr-3", css.title)}
          >
            Finance Manager
          </Navbar.Brand>
          <Navbar.Toggle className="navbar-toggler" aria-controls="menu" />
          <Navbar.Collapse id="menu">
            <Nav className="justify-content-center w-100 align-items-center">
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row>
        <Col sm={12} lg={6} data-aos="fade-up" data-aos-duration="2000">
          <h1 className={cs(css.title, "title-header")}>
            Do you need help to manage your expenses?
          </h1>
          <Button
            size="lg"
            className="text-dark bg-white mt-5 rounded-0 px-5 py-3"
            onClick={()=>{
        navigate("/Login")
    }}
          >
            Login
          </Button>
          <Button
            size="lg"
            className="text-dark mt-5 rounded-0 px-5 py-3"
            style={{marginLeft:'2%'}}
            onClick={navRegister}
          >
            Sign Up
          </Button>
        </Col>
        <Col
          sm={6}
          className="d-none d-lg-block position-relative"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <Image
            src={headerImage}
            alt="We are the greatest programmers"
            className="w-100 position-absolute header-figure"
            fluid
          />
        </Col>
      </Row>
      <div className="position-relative header-feactures">
        <Row>
          <Col sm={6} md={4} lg={4} className="mb-3">
            <HeaderCard title="Set Budget Goals" image="https://img.freepik.com/premium-vector/cost-per-acquisition-abstract-concept-vector-illustration_107173-24692.jpg?w=1380" />
          </Col>
          <Col sm={6} md={4} lg={4} className="mb-3">
            <HeaderCard title="Monitor and Achieve" image="https://img.freepik.com/free-vector/businessman-with-trophy-cup-jumping-books-target-rising-arrow-motivation-job-success-encouragement-concept-white-background_335657-1682.jpg?w=1800&t=st=1683823732~exp=1683824332~hmac=4c67a55cb31967620199d8538f72588ace62218b27b32d30bfdebb4813ffd269" />
          </Col>
          <Col sm={12} md={4} lg={4} className="mb-3">
            <HeaderCard title="Community" image={helperPeople} />
          </Col>
        </Row>
      </div>
    </header>
  );
}