"use client";
import { ResponsiveStream } from "@nivo/stream";

const StreamChart = ({ data }) => {
  return (
    <div style={{ height: "350px", width: "100%" }}>
      <ResponsiveStream
        data={data}
        keys={["1월", "2월", "3월", "4월", "5월", "6월"]}
        margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        // axisBottom={{
        //   orient: "bottom",
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: "",
        //   legendOffset: 36,
        // }}
        axisLeft={null}
        enableGridX={true}
        enableGridY={false}
        offsetType="diverging"
        colors={{ scheme: "purples" }}
        borderColor={{ theme: "background" }}
        dotColor={{ from: "color" }}
        dotBorderWidth={2}
        dotBorderColor={{
          from: "color",
          modifiers: [["darker", 0.7]],
        }}
        legends={[
          {
            anchor: "top-right",
            direction: "row",
            translateY: -30,
            translateX: -10,
            itemWidth: 50,
            itemHeight: 20,
            itemTextColor: "#999999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default StreamChart;
