/* eslint-disable */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home() {
  const router = useRouter();

  // const onClick = (id, title) => {
  //   router.push(
  //     {
  //       pathname: `/movies/${id}`,
  //       query: {
  //         title: title,
  //       },
  //     },
  //     `/movies/${id}`
  //   );
  // };

  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  const [movies, setMovies] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/movies`);
  //     const { results } = await response.json();
  //     setMovies(results);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies`)).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="Home" />
      {
        /* &&는 왼쪽 조건이 True일 때 오른쪽을 출력 */
        !movies && <h4>Loading...</h4>
      }
      {movies?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            {/* <Link
              href={{
                pathname: `/movies/${movie.id}`,
                query: {
                  title: movie.original_title,
                },
              }}
              as={`/movies/${movie.id}`}
            >
              <a>{movie.original_title}</a>
            </Link> */}

            {/* <Link href={`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link> */}

            <a>{movie.original_title}</a>
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// Server side에서만 돌아가는 code 작성
// function 이름이 중요
// _app.js 에서 pageProps 으로 넣어주는 부분이 이 함수의 return값.
// Home ({results}) <- 여기에 넣어주면 pageProps로 받아서 사용할 수 있음

// export async function getServerSideProps() {
//   const {results} = await (
//     await fetch(
//       `http://localhost:3000/api/movies`
//     )
//   ).json();
//   return {
//     props: {
//       results,
//     },
//   };
// }
