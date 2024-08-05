import React from "react";

const OrderDetailEtapComponent: React.FC = () => {
  return (
    <div className="etaps-container">
      <div className="progress-bar">
        <div className="bar active">
          <div className="radius active">
            <span>✔</span>
          </div>
        </div>
        <div className="bar">
          <div className="radius-is-readyng active"></div>
        </div>
        <div className="bar">
          <div className="radius"></div>
          <div className="radius"></div>
        </div>
      </div>

      <div className="progress-bar-descriptions">
        <div className="is-ordered">
          <img src="../Notebook.svg" alt="notebook" />
          <span>Sifariş verildi</span>
        </div>
        <div className="is-ordered cargo">
          <img src="../kargo.png" alt="kargo" />
          <span>Kargoya hazırlanır</span>
        </div>
        <div className="is-ordered ride">
          <img src="../tt.svg" alt="tt" />
          <span>Yola çıxdı</span>
        </div>
        <div className="is-ordered delivered">
          <img src="../delivered.svg" alt="delivered" />
          <span>Teslim edildi</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailEtapComponent;
