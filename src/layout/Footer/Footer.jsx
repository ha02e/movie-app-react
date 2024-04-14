import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.style.css";

const Footer = () => {
  return (
    <div>
      <Container className="footer-section">
        <Row>
          <Col>
            <div className="github-info">
              <a
                href="https://github.com/ha02e/movie-app-react.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  class="github-icon"
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                  alt="github"
                />
                https://github.com/ha02e/movie-app-react.git
              </a>
            </div>
            <p>
              Copyright 2024. Lee HaYoung
              <br />
              상업적 용도가 아닌 개인 프로젝트 입니다.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
