import "../styles/main.css";
import React from "react";
import {SessionProvider} from "next-auth/react"
import {RouteGuard} from "../components/RouteGuard";

const App = ({
                 Component,
                 pageProps: {session, ...pageProps}
             }) => {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <RouteGuard>
                <div id={`rootElement`}>
                    <Component {...pageProps} />
                </div>
            </RouteGuard>
        </SessionProvider>
    )
}

export default App
