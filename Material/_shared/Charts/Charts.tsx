import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react";

interface CustomizedAxisTickProps {
  x: number;
  y: number;
  stroke: string;
  payload: {
    value: string;
  };
}

/**
 * Renders a customized axis tick for the chart.
 */
export const CustomizedAxisTick: React.FC<CustomizedAxisTickProps> = ({
  x,
  y,
  payload,
}) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform="rotate(-35)"
    >
      {payload.value}
    </text>
  </g>
);

interface CountChartProps {
  count: Array<{ res: number; [key: string]: unknown }>;
  label: string;
}

/**
 * Renders a bar chart component to display count data.
 */
export const CountChart: React.FC<CountChartProps> = ({ count, label }) => (
  <BarChart
    width={600}
    height={300}
    data={count}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="name">
      <Label value={label} offset={0} position="insideBottom" />
    </XAxis>
    <YAxis dataKey="res" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Bar dataKey="res" fill="#8884d8" />
  </BarChart>
);

interface CountChartWithFieldProps {
  count: Array<{ _id: string; total: number; [key: string]: unknown }>;
  label: string;
  field: string;
}

/**
 * Renders a radar chart component to display count data with a specific field.
 */
export const CountChartWithField: React.FC<CountChartWithFieldProps> = ({
  count,
}) => (
  <RadarChart outerRadius={90} width={730} height={250} data={count}>
    <PolarGrid />
    <PolarAngleAxis dataKey="_id" />
    <PolarRadiusAxis angle={30} domain={[0, 150]} />
    <Radar
      name="Mike"
      dataKey="total"
      stroke="#8884d8"
      fill="#8884d8"
      fillOpacity={0.6}
    />
  </RadarChart>
);

interface SumChartProps {
  sum: Array<{ _id: { year: number }; res: number; [key: string]: unknown }>;
}

/**
 * Renders a bar chart component to display sum data.
 */
export const SumChart: React.FC<SumChartProps> = ({ sum }) => (
  <BarChart
    width={600}
    height={300}
    data={sum}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="_id.year" />
    <YAxis dataKey="res" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar dataKey="res" fill="#8884d8" />
  </BarChart>
);

interface AverageChartProps {
  average: Array<{ _id: { year: number }; res: number; [key: string]: unknown }>;
}

/**
 * Renders a line chart component to display average data.
 */
export const AverageChart: React.FC<AverageChartProps> = ({ average }) => (
  <LineChart
    width={600}
    height={300}
    data={average}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="_id.year" />
    <YAxis dataKey="res" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="res" stroke="#8884d8" />
  </LineChart>
);
