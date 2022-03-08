import "../styles/main.css";
import React from "react";

const App = ({Component, pageProps}) => {
    return (
        <div id={`rootElement`}>
            <Component {...pageProps} />
        </div>
    )
}

export default App
