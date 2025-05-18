"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const dummyData = [
  {
    name: "Jan",
    projects: 0,
    blogs: 0,
  },
  {
    name: "Feb",
    projects: 0,
    blogs: 0,
  },
  {
    name: "Mar",
    projects: 0,
    blogs: 0,
  },
  {
    name: "Apr",
    projects: 0,
    blogs: 0,
  },
  {
    name: "May",
    projects: 0,
    blogs: 0,
  },
  {
    name: "Jun",
    projects: 0,
    blogs: 0,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={dummyData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar
          dataKey="projects"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          name="Projects"
        />
        <Bar
          dataKey="blogs"
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
          name="Blog Posts"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}