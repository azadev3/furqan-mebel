import React from "react";
import { Range, getTrackBackground } from "react-range";
import { useTranslations } from "./TranslateContext";

const STEP = 1;
const MIN = 3;
const MAX = 24;

const CreditSlider = () => {
  const [values, setValues] = React.useState([12]);

  const { translations } = useTranslations();

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h3>{translations['kredit_sertleri']}</h3>
      </div>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              display: "flex",
              width: "100%",
            }}>
            <div
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#0f0", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}>
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#0f0" : "#CCC",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-30px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#0f0",
              }}>
              {values[0]} ay
            </div>
          </div>
        )}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}>
        {Array.from({ length: (MAX - MIN) / STEP + 1 }, (_, i) => MIN + i * STEP).map((val) => (
          <div key={val} style={{ fontSize: "10px" }}>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditSlider;
