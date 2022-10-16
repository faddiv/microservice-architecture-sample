import { FunctionComponent } from "react";
import { Carousel } from "react-bootstrap";

export const IndexCarosuel: FunctionComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/banner/banner1.png" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/banner/banner2.png" alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/banner/banner3.png" alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};
