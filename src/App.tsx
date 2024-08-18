import { Button } from "@/components/ui/button";
import { terrain, bowl, random, Results } from "@/lib/functions";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { ParamsCard } from "@/components/params-card";
import "./App.css";

function Basic() {
  const [values, setValues] = useState<Results>(
    random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 1),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <h1 className="text-3xl">A basic plot</h1>
      <div>
        <Plot
          data={[
            {
              x: values.x,
              y: values.y,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
            { type: "bar", x: values.x, y: values.y },
          ]}
          //layout={{ width: "100%", height: "100%", title: "Example Plot" }}
        />
      </div>
      <Button
        onClick={() =>
          setValues(random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 1))
        }
      >
        Random
      </Button>
    </>
  );
}

function SimpleMesh3D() {
  const [values, setValues] = useState<Results>(
    random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 1),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <h1 className="text-3xl">A simple 3D plot</h1>
      <div className="w-full bg-gray-300">
        <Plot
          data={[
            {
              ...values,
              type: "mesh3d",
              //          color: "grey",
              intensity: [
                0, 0.14285714285714285, 0.2857142857142857, 0.42857142857142855,
                0.5714285714285714, 0.7142857142857143, 0.8571428571428571, 0.9,
                0.95, 1,
              ],
              colorscale: "Viridis",
              opacity: 0.5,
            },

            {
              ...values,
              type: "scatter3d",
              // mode: "lines+markers",
              marker: {
                color: "red",
                size: 2,
              },
            },
          ]}
          layout={{ width: "100%", height: "100%", title: "Example Plot" }}
        />
      </div>
      <Button
        onClick={() =>
          setValues(random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 1))
        }
      >
        Random
      </Button>
    </>
  );
}

function Mesh3D({ func }: { func: Function }) {
  const [values, setValues] = useState<Results>(
    func({ x: [0, 10], y: [0, 10], z: [0, 10] }, 10),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setValues(random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [markers, setMarkers] = useState<boolean>(true);
  const [lines, setLines] = useState<boolean>(true);
  const graphMode =
    markers && lines
      ? "lines+markers"
      : markers
        ? "markers"
        : lines
          ? "lines"
          : "none";
  return (
    <>
      <h1 className="text-3xl">A simple 3D plot</h1>
      <div>
        <Plot
          data={[
            {
              ...values,
              type: "mesh3d",
              colorscale: "Blues",
              opacity: 0.75,
            },

            {
              ...values,
              type: "scatter3d",
              // mode: "lines+markers",
              mode: graphMode,
              line: lines
                ? {
                    width: lines ? 4 : 0,
                    color: random({ x: [0, 10], y: [0, 10], z: [0, 10] }, 10).z, // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    colorscale: "Viridis",
                  }
                : undefined,

              marker: {
                //color: "red",
                colorscale: "Viridis",
                color: values.z, // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                size: markers ? 1.5 : 0,
                cmin: 0,
                cmax: 5,
              },
            },
          ]}
          //layout={{ width: "100%", height: "100%", title: "Example Plot" }}
        />
      </div>
      <ParamsCard
        markers={markers}
        lines={lines}
        setMarkers={setMarkers}
        setLines={setLines}
        type={func.name}
      />
      <div className="w-full pb-5">
        <h2>Values-Length</h2>
        <code className="w-full bg-gray-300 px-5 py-1">
          {JSON.stringify(
            { x: values.x.length, y: values.y.length, z: values?.z.length },
            null,
            2,
          )}
        </code>
      </div>
      <Button
        onClick={() =>
          setValues(func({ x: [0, 10], y: [0, 10], z: [0, 10] }, 10))
        }
      >
        Random
      </Button>
    </>
  );
}
export default function App() {
  return <Mesh3D func={terrain} />;
}
