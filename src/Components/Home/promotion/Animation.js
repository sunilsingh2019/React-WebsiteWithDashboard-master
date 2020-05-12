import React from "react";
import Zoom from "react-reveal/Zoom";
import Jersey from "./../../../Resources/images/jersey.jpg";

const PromotionAnimation = () => {
  return (
    <div className="promotion-content">
      <div className="promotion-content__left">
        <Zoom>
          <div>
            <span>win A</span>
            <span>jersey</span>
          </div>
        </Zoom>
      </div>
      <div className="promotion-content__right">
        <Zoom>
          <div className="promotion-img">
            <img src={Jersey} alt="jersey" />
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default PromotionAnimation;
