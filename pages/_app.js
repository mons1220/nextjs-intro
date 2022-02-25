import NavBar from "../components/NavBar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <footer>JHLee</footer>
      <style jsx global>{`
        a {
          color: white;
        }
        footer {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 5px 0;
          text-align: center;
          color: white;
          background: grey;
        }
      `}</style>
    </>
  );
}
