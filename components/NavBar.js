import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <nav>
      <Link href="/nextjs-intro/">
        <a className={router.pathname === "/" ? "active" : ""}>Home</a>
      </Link>
      <Link href="/nextjs-intro/about">
        <a className={router.pathname === "/about" ? "active" : ""}>About</a>
      </Link>
      <Link href="/nextjs-intro/test">
        <a className={router.pathname === "/test" ? "active" : ""}>Test</a>
      </Link>
      <style jsx>{`
        nav {
          background-color: tomato;
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
