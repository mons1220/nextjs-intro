/* eslint-disable */
import loadable from "@loadable/component";

const ForceGraph = loadable(() => import("../components/graph"));

export default function App({ results }) {
  return (
    <div>
      <ForceGraph
        graphData={results}
        width={520}
        height={800}
        nodeAutoColorBy="category"
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleColor={() => "red"}
      />
    </div>
  );
}

// Server side에서만 돌아가는 code 작성
// function 이름이 중요
// _app.js 에서 pageProps 으로 넣어주는 부분이 이 함수의 return값.
export async function getServerSideProps() {
  const results = await (
    await fetch(
      `https://echarts.apache.org/examples/data/asset/data/les-miserables.json`
    )
  ).json();
  results.nodes.forEach(function (node) {
    node.symbolSize = node.symbolSize / 2;
  });
  return {
    props: {
      results,
    },
  };
}
