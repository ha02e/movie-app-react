import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();

    //url을 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/" className="logo-img">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button className="search-btn">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
