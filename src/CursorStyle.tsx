import { CSSProperties } from "react";

export const CursorStyle: (CSSProperties) = {
    boxSizing: "border-box",
    width: "100px",
    height: "100px",
    position: "fixed",
    marginLeft: "-50px",
    marginTop: "-50px",
    zIndex: 910,
    borderColor: "#2E769E",
    backgroundColor: "transparent",
    borderRadius: "100%",
    borderWidth: "5px",
    opacity: "0.8",
    borderStyle: "solid"
    
};

export const CursorRingStyle: (CSSProperties) = {
    boxSizing: "border-box",
    width: "300%",
    height: "300%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 910,
    borderColor: "#2E769E",
    backgroundColor: "transparent",
    borderRadius: "100%",
    borderWidth: "5px",
    opacity: "0",
    borderStyle: "solid"
};