/* eslint-disable */
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
  // front에서 보여주는 방법
  // 서버에서 rending 되기 때문에, 바로 주소만 받으면 router.query.params는 처음에 값이 없음
  // const router = useRouter();
  // const [title, id] = router.query.params || [];

  // back에서 받는 방법, getServerSideProps에서 url->params로 받은 값을 사용
  const [title, id] = params || [];

  const [movie_detail, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const results = await (await fetch(`/api/movies/${id}`)).json();
      console.log(results);
      setData(results);
    })();
  }, []);

  return (
    <div>
      <Seo title={title}></Seo>
      <h2>
        {
          /* ||는 왼쪽 있으면 왼쪽, 없으면 오른쪽을 출력 */
          title || "Loading..."
        }
      </h2>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie_detail?.poster_path}`}
      />

      <h5>{movie_detail?.overview}</h5>

      {movie_detail?.production_companies?.map((info) => (
        <div className="production" key={info.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${info.logo_path}`}
            alt=""
          />
          <h4>
            <a>{info.name}</a>
          </h4>
        </div>
      ))}
      <style jsx>{`
        h2 {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// pageProps에서 제공하는 context에 url에서 파일명의 params으로 받은 값이 있음. 이걸 사용할 수도
export function getServerSideProps({ query: { params } }) {
  return {
    props: { params },
  };
}
