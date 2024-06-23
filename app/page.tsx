import Map from "./components/Map.tsx";
import { data } from "./data/data";

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100%", margin: 0 }}>
      <Map data={data} defaultOpacity={0.5} highlightOpacity={0.8} lineThickness={2} startingLatitude={-75.94} startingLongitude={45.47} startingZoom={70000} legendFontSize={15} />
    </div>
  );
}
