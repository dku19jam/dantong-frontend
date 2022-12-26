import type { AppProps } from 'next/app'
import "../styles/globals.css"
import Layout from './components/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

config.autoAddCss = false


export default function App({Component, pageProps} : AppProps){
    return(
        <>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </>
    )
}