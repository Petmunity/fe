import { ResponsiveLine } from "@nivo/line";
import data from "./line.data.json";

const LineChart = () => (
  <div
    style={{
      width: "100%",
      height: "350px",
    }}
  >
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 0, bottom: 50, left: 0 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      colors={{ scheme: "purple_orange" }}
      lineWidth={3}
      enablePoints={false}
      enableArea={true}
      areaOpacity={0.55}
      useMesh={true}
      legends={[
        {
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -30,
          itemsSpacing: 20,
          itemDirection: "left-to-right",
          itemWidth: 50,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 11,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default LineChart;
