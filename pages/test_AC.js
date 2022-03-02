/* eslint-disable */
import React from "react";
import ReactECharts from "echarts-for-react";

export default function Page({ results }) {
  const option = {
    legend: {
      data: results.categories,
    },

    series: [
      {
        type: "graph",
        layout: "force",
        animation: true,
        label: {
          normal: {
            position: "right",
            formatter: "{b}",
          },
        },
        draggable: true,
        data: results.nodes,
        categories: results.categories,
        force: {
          initLayout: "circular",
          // repulsion: 20,
          edgeLength: 100,
          repulsion: 200,
          gravity: 0.001,
        },
        edges: results.links,
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: "700px", width: "100%" }}
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
