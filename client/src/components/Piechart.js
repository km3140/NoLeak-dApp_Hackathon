import React from "react";
import { ResponsivePie } from "@nivo/pie";

const Piechart = ({ tokens, priceObject }) => {
  return (
    <div style={{ width: "550px", height: "375px", margin: "0" }}>
      <ResponsivePie
        isInteractive={false}
        data={[
          {
            id: tokens[0].name,
            value: tokens[0].count * priceObject[tokens[0].id]?.usd,
          },
          {
            id: tokens[1].name,
            value: tokens[1].count * priceObject[tokens[1].id]?.usd,
          },
        ]}
        margin={{ top: 40, right: 0, bottom: 80, left: 40 }}
        innerRadius={0.5}
        valueFormat=" >-$,"
        padAngle={1.8}
        cornerRadius={8}
        colors={{ scheme: "yellow_orange_red" }}
        borderWidth={4}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsThickness={4}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        theme={{
          labels: {
            text: {
              fontSize: 12,
              fontWeight: 600,
              fill: "#000000",
            },
          },
          legends: {
            text: {
              fontSize: 14,
              fontWeight: 600,
              fill: "#000000",
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 20,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "square",
          },
        ]}
      />
    </div>
  );
};

export default Piechart;
