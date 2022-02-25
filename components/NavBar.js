import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <nav>
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
      <style jsx>{`
        nav {
          background-color: tomato;
          display: flex;
          justify-content: space-evenly;
          padding: 10px 0;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
  );
}
