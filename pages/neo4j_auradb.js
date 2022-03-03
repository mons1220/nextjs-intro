/* eslint-disable */
import loadable from "@loadable/component";
import { useEffect, useState } from "react";

const ForceGraph = loadable(() => import("../components/graph"));
const neo4j = require("neo4j-driver");
const uri = "neo4j+s://d4a7d670.databases.neo4j.io";
const user = "neo4j";
const auradb_key = process.env.NEXT_PUBLIC_AURA_KEY;
const person1Name_array = [
  "Al Pacino",
  "Keanu Reeves",
  "Charlize Theron",
  "Joel Silver",
];
const person1Name = "Joel Silver";

export default function Neo4j() {
  const [node_c, setNode_c] = useState([]);
  const [graphdb, setGraphDb] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    (async () => {
      const driver = neo4j.driver(uri, neo4j.auth.basic(user, auradb_key));
      const session = driver.session();
      try {
        var nodecheck = node_c.indexOf(person1Name);
        if (nodecheck == -1) {
          setGraphDb((old) => ({
            nodes: [...old.nodes, { id: person1Name, category: "Person" }],
            links: old.links,
          }));
          setNode_c((old) => [...old, person1Name]);
        }

        const readQuery = `MATCH path=(p:Person)-[]->(:Movie)
                                    WHERE p.name = $personName
                                    RETURN path`;
        const readResult = await session.readTransaction((tx) =>
          tx.run(readQuery, { personName: person1Name })
        );
        readResult.records.forEach((record) => {
          // set nodes
          var rfept = record._fields[0].end.properties["title"];
          var nodecheck = node_c.indexOf(rfept);
          if (nodecheck == -1) {
            setGraphDb((old) => ({
              nodes: [...old.nodes, { id: rfept, category: "Movie" }],
              links: old.links,
            }));
            setNode_c((old) => [...old, rfept]);
          }
          // set links
          setGraphDb((old) => ({
            nodes: old.nodes,
            links: [...old.links, { source: person1Name, target: rfept }],
          }));
        });
      } catch (error) {
        console.error("Something went wrong: ", error);
      } finally {
        await session.close();
      }

      // Don't forget to close the driver connection when you're finished with it
      await driver.close();
    })();
  }, []);

  return (
    <div>
      <h1> {"Movie"} </h1>
      <div>
        {
          /* &&는 왼쪽 조건이 True일 때 오른쪽을 출력 */
          node_c.length > 0 && (
            <ForceGraph
              graphData={graphdb}
              width={520}
              height={600}
              nodeAutoColorBy="category"
              nodeLabel="id"
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={3}
              linkDirectionalParticleColor={() => "red"}
            />
          )
        }
      </div>
    </div>
  );
}

// (async() => {
//     const neo4j = require('neo4j-driver')

//     const uri = 'neo4j+s://<Bolt url for Neo4j Aura database>';
//     const user = '<Username for Neo4j Aura database>';
//     const password = '<Password for Neo4j Aura database>';

//     const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
//     const session = driver.session()

//     const person1Name = 'Alice'
//     const person2Name = 'David'

//     try {
//       // To learn more about the Cypher syntax, see https://neo4j.com/docs/cypher-manual/current/
//       // The Reference Card is also a good resource for keywords https://neo4j.com/docs/cypher-refcard/current/
//       const writeQuery = `MERGE (p1:Person { name: $person1Name })
//                           MERGE (p2:Person { name: $person2Name })
//                           MERGE (p1)-[:KNOWS]->(p2)
//                           RETURN p1, p2`

//       // Write transactions allow the driver to handle retries and transient errors
//       const writeResult = await session.writeTransaction(tx =>
//         tx.run(writeQuery, { person1Name, person2Name })
//       )
//       writeResult.records.forEach(record => {
//         const person1Node = record.get('p1')
//         const person2Node = record.get('p2')
//         console.log(
//           `Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`
//         )
//       })

//       const readQuery = `MATCH (p:Person)
//                          WHERE p.name = $personName
//                          RETURN p.name AS name`
//       const readResult = await session.readTransaction(tx =>
//         tx.run(readQuery, { personName: person1Name })
//       )
//       readResult.records.forEach(record => {
//         console.log(`Found person: ${record.get('name')}`)
//       })
//     } catch (error) {
//       console.error('Something went wrong: ', error)
//     } finally {
//       await session.close()
//     }

//     // Don't forget to close the driver connection when you're finished with it
//     await driver.close()
//    })();
