'use client';

import { Card } from '@radix-ui/themes';
import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis,Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({open, inProgress, closed}: Props) => {

  const data = [  
    {label: 'Open', value: open},
    {label: 'In Progress', value: inProgress},
    {label: 'Closed', value: closed},
]

    const COLORS: Record<string, string> = {
    Open: '#F87171',          // red
    'In Progress': '#FBBF24', // yellow
    Closed: '#34D399',        // green
  };

  return (
    <Card>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <XAxis dataKey='label'/>
            <YAxis/>
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={60} activeBar={<Rectangle stroke="black" />}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.label]} />
            ))}
          </Bar>
          </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart