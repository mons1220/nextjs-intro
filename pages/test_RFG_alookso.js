/* eslint-disable */
import loadable from "@loadable/component";
// import { useCallback, useRef } from "react/cjs/react.production.min";
import React from "react";
import SpriteText from "three-spritetext";
// import test from "../G_user.json";

const ForceGraph = loadable(() => import("../components/graph"));

export default function App({ results }) {
  const jsonData = require("../G_user.json");
  //   console.log(jsonData);

  const { useRef, useCallback } = React;
  const fgRef = useRef();
  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    [fgRef]
  );

  return (
    <div className="canvas">
      <ForceGraph
        ref={fgRef}
        graphData={jsonData}
        width={520}
        height={600}
        nodeAutoColorBy="category"
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.id_name);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={1}
        linkDirectionalParticleColor={() => "red"}
        enableNodeDrag={false}
        onNodeClick={handleClick}
      />
      <style jsx>{`
        .canvas {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

// Server side에서만 돌아가는 code 작성
// function 이름이 중요
// _app.js 에서 pageProps 으로 넣어주는 부분이 이 함수의 return값.
// export async function getServerSideProps() {
//   const results = await (
//     await fetch(
//       `https://echarts.apache.org/examples/data/asset/data/les-miserables.json`
//     )
//   ).json();
//   results.nodes.forEach(function (node) {
//     node.symbolSize = node.symbolSize / 2;
//   });
//   return {
//     props: {
//       results,
//     },
//   };
// }
