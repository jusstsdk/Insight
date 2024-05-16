import owl from "./owl.png";
import { Col, Row } from "react-bootstrap";

const Banner = () => {
  return (
    <Row className="align-items-center mb-2 mb-sm-3">
      <Col lg={4} className={"text-center"}>
        <img
          src={owl}
          className={"img-fluid"}
          alt="Сова в очках, держащая книгу в лапах"
        />
      </Col>

      <Col lg={8}>
        <p className={"fs-2"}>
          <span className={"fw-bolder"}>Инсайт</span> - образовательная
          платформа для всех, с фокусом на инклюзивности. Исследуйте знания
          через звук и ощущения. Откройте новые горизонты уже сегодня!
        </p>
      </Col>
    </Row>
  );
};

export default Banner;
