import React from "react";
import ReactECharts from "echarts-for-react";
import test from "../components/data.json";

function Page() {
  var node_new = new Array();
  test.nodes.forEach(function (element) {
    var newelement = {};
    newelement["name"] = element["id"];
    newelement["value"] = 1;
    newelement["category"] = element["group"];

    node_new.push(newelement);
  });

  var categories_list = new Array();
  for (var i = 0; i < 10; i++) {
    var newelement = {};
    newelement["name"] = i + 1;
    newelement["keyword"] = {};
    newelement["base"] = i + 1;
    categories_list.push(newelement);
  }

  const remiserable = {
    type: "force",
    categories: categories_list,
    nodes: node_new,
    links: test.links,
  };

  const option = {
    legend: {
      data: [...Array(10).keys()].map(String),
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
        data: remiserable.nodes,
        categories: remiserable.categories,
        force: {
          initLayout: "circular",
          // repulsion: 20,
          edgeLength: 50,
          repulsion: 50,
          gravity: 0.01,
        },
        edges: remiserable.links,
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

export default Page;
