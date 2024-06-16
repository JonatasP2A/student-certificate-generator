'use client';

import { Certificate } from '@/types/Certificate';
import { useSession } from 'next-auth/react';
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

type OverviewProps = {
  data: Certificate[];
};

export function Overview({ data }: OverviewProps) {
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();

  const strokeColor = resolvedTheme === 'dark' ? '#adfa1d' : '#000';

  const studentData = data.filter((d) => d.alunoId === session?.user.id);
  const teacherData = data.filter(
    (d) => d.nomePalestrante === session?.user.name
  );

  const filteredData =
    session?.user.role === 'Admin' ? teacherData : studentData;

  const dataToDisplay = filteredData.map((d, index) => {
    let sum = 0;
    for (let i = 0; i <= index; i++) {
      sum += data[i].quantidadeHoras;
    }

    return {
      name: d.nomeEvento,
      workload: sum,
      amt: sum
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        width={500}
        height={300}
        data={dataToDisplay}
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
