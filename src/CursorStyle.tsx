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
    borderStyle: "solid",
    top: "50vh",
    left: "50vw"
    
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

export const LeapError: CSSProperties = {
    position: "absolute", 
    top: 0, 
    left:0, 
    width:"100vw", 
    height:"100vh", 
    zIndex:1000, 
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    background:"#fff"
}

export const CenterDot: CSSProperties = {
    width: "10px", 
    height:"10px", 
    position:"absolute", 
    top:"50%", 
    left:"50%", 
    background:"orange", 
    transform:"translate(-50%, -50%)"
}