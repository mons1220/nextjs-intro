/* eslint-disable */

import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <nav>
      <img src="/vercel.svg" />
      <div>
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>Home</a>
        </Link>
        <Link href="/about">
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
        <Link href="/test_AC">
          <a className={router.pathname === "/test_AC" ? "active" : ""}>
            test_AC
          </a>
        </Link>
        <Link href="/test_RFG">
          <a className={router.pathname === "/test_RFG" ? "active" : ""}>
            test_RFG
          </a>
        </Link>
        {/* <Link href="/neo4j_auradb">
          <a className={router.pathname === "/neo4j_auradb" ? "active" : ""}>
            neo4j_aura
          </a>
        </Link> */}
        <Link href="/test_RFG_alookso">
          <a
            className={router.pathname === "/test_RFG_alookso" ? "active" : ""}
          >
            test_alookso
          </a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
