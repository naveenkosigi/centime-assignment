import { ResponsiveSankey } from "@nivo/sankey";
import React from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const SankeyChart = (props: { data: any[] }) => {
  return (
    <ResponsiveSankey
      data={props.data}
      margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
      align="justify"
      colors={{ scheme: "category10" }}
      nodeOpacity={1}
      nodeHoverOthersOpacity={0.35}
      nodeThickness={18}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{
        from: "color",
        modifiers: [["darker", 0.8]],
      }}
      nodeBorderRadius={3}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      linkContract={3}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="vertical"
      labelPadding={16}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 130,
          itemWidth: 100,
          itemHeight: 14,
          itemDirection: "right-to-left",
          itemsSpacing: 2,
          itemTextColor: "#999",
          symbolSize: 14,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default SankeyChart;

const test = {
  nodes: [
    {
      id: "John",
    },
    {
      id: "Raoul",
    },
    {
      id: "Jane",
    },
    {
      id: "Marcel",
    },
    {
      id: "Ibrahim",
    },
    {
      id: "Junko",
    },
  ],
  links: [
    {
      source: "Ibrahim",
      target: "John",
      value: 184,
    },
    {
      source: "Ibrahim",
      target: "Junko",
      value: 21,
    },
    {
      source: "Ibrahim",
      target: "Marcel",
      value: 121,
    },
    {
      source: "Ibrahim",
      target: "Raoul",
      value: 86,
    },
    {
      source: "Ibrahim",
      target: "Jane",
      value: 139,
    },
    {
      source: "Jane",
      target: "Junko",
      value: 121,
    },
    {
      source: "Jane",
      target: "Marcel",
      value: 194,
    },
    {
      source: "Jane",
      target: "Raoul",
      value: 48,
    },
    {
      source: "Junko",
      target: "Marcel",
      value: 103,
    },
    {
      source: "Raoul",
      target: "Junko",
      value: 31,
    },
    {
      source: "Raoul",
      target: "John",
      value: 102,
    },
    {
      source: "Marcel",
      target: "John",
      value: 167,
    },
  ],
};
