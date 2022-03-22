import "../styles/main.css";
import React from "react";
import {SessionProvider} from "next-auth/react"

const App = ({
                 Component,
                 pageProps: {session, ...pageProps}
             }) => {
    return (
        <SessionProvider session={session}>
            <div id={`rootElement`}>
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    )
}

export default App
