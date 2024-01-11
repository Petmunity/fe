import { ResponsiveBar } from "@nivo/bar";
import data from "./bar.data.json";

const BarChart = () => (
  <div
    style={{
      width: "100%",
      height: "350px",
    }}
  >
    <ResponsiveBar
      data={data}
      keys={["food"]}
      indexBy="month"
      margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
      padding={0.4}
      groupMode="grouped"
      colors={"#9E77ED"}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      borderRadius={4}
      colorBy="indexValue"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        truncateTickAt: 0,
      }}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#ffffff"
      role="application"
      ariaLabel="식사량 그래프"
    />
  </div>
);

export default BarChart;
