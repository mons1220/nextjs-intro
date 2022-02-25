import test from "../data.json";
import loadable from "@loadable/component";

const ForceGraph = loadable(() => import("../components/graph"));

export default function App() {
  return (
    <div>
      <ForceGraph
        graphData={test}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={3}
        linkDirectionalParticleColor={() => "red"}
      />
    </div>
  );
}
