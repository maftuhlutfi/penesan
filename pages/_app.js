import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import Footer from '../components/shared/Footer'
import Navigation from '../components/shared/Navigation'

import '../styles/global.css'
import '../styles/font-style.css' //nprogress module
import '../styles/nprogress.css'; 

import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import ScrollToTopBtn from '../components/shared/ScrollToTopBtn'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done()); 

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const pageWithoutNav = ['/quiz/[slug]/do']

  return (
    <div className='text-text-primary'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </Head>
      {!pageWithoutNav.includes(router.pathname) && <Navigation />}
      <Component {...pageProps} />
      <Footer />
      <ScrollToTopBtn />
    </div>
  )
}

export default MyApp
