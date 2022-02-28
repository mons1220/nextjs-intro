/* eslint-disable */
import test from "../components/data.json";
import loadable from "@loadable/component";

const ForceGraph = loadable(() => import("../components/graph"));

export default function App() {
  return (
    <div>
      <ForceGraph
        graphData={test}
        width={520}
        height={800}
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleColor={() => "red"}
      />
    </div>
  );
}
