//import react into the bundle
//Index.js suele ser el punto de entrada de las aplicaciones. Donde se crea la aplicación
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
// renderizar: Mostar en pantalla

//Componente es todo aquel elemento de React que podamos ejecutar

ReactDOM.render(<Home />, document.querySelector("#app"));