'use client';

import { useTheme } from 'next-themes';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  {
    name: '06/02/2024',
    workload: 0,
    amt: 0
  },
  {
    name: '06/03/2024',
    workload: 5,
    amt: 5
  },
  {
    name: '06/03/2024',
    workload: 15,
    amt: 15
  },
  {
    name: '06/04/2024',
    workload: 20,
    amt: 20
  },
  {
    name: '06/05/2024',
    workload: 30,
    amt: 30
  },
  {
    name: '06/06/2024',
    workload: 35,
    amt: 35
  }
];

export function Overview() {
  const { resolvedTheme } = useTheme();

  const strokeColor = resolvedTheme === 'dark' ? '#adfa1d' : '#000';

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" />
        <YAxis stroke="#888888" />
        <Tooltip labelStyle={{ color: '#09090B' }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="workload"
          stroke={strokeColor}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
