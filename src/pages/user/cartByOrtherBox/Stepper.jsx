import React from "react";
import { Step1, Step2, Step3, Step4 } from "../../../assets/iconSVG/constants.jsx";

const steps = [
  { icon: <Step1 />, label: "Giỏ hàng" },
  { icon: <Step2 />, label: "Thông tin đặt hàng" },
  { icon: <Step3 />, label: "Thanh toán" },
  { icon: <Step4 />, label: "Hoàn tất" },
];

export default function Stepper({ currentStep = 0 }) {
  return (
    <section
      style={{
        background: "#fff0f0",
        borderRadius: 12,
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
                    <div
                     style={{
                        width: 25,
                        height: 25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 6,
                        borderRadius: "50%",
                        background: idx === currentStep ? "rgb(227, 0, 25)" : "#fff",
                        border: "2px solid " + (idx === currentStep ? "rgb(227, 0, 25)" : "#535353"),
                        boxShadow: idx === currentStep ? "rgb(227, 0, 25) 0px 0px 0px 2px" : "none",
                        transition: "0.2s",
                        boxSizing: "border-box",
                      }}
                    >
                    <span
                        style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 18,
                        height: 18,
                        }}
                    >
                    {React.cloneElement(
                    step.icon,
                    idx === currentStep
                        ? { stroke: "#E30019", fill: "#fff", width: 18, height: 18 }
                        : { stroke: "#535353", fill: "#535353", width: 18, height: 18 }
                    )}
                                        </span>
                </div>
            <div
              style={{
                color: idx === currentStep ? "#E30019" : "#535353",
                fontWeight: 500,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {step.label}
            </div>
            {idx < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 13,
                  right: "-50%",
                  width: "87%",
                  borderTop: "2px dashed #bdbdbd",
                  zIndex: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}