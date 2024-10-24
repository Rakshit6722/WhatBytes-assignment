import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const DynamicPercentileChart = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [activeLineId, setActiveLineId] = useState(null);
  const [chartData, setChartData] = useState({ beforePercentile: [], afterPercentile: [] });

  const userPercentile = useSelector((state) => state.user.percentile);

  const createSplitData = (percentile) => {
    const baseData = [
      { percentile: 0, value: 1 },
      { percentile: 10, value: 2 },
      { percentile: 20, value: 3 },
      { percentile: 25, value: 6 },
      { percentile: 30, value: 8 },
      { percentile: 35, value: 12 },
      { percentile: 40, value: 14 },
      { percentile: 45, value: 15 },
      { percentile: 50, value: 13 },
      { percentile: 60, value: 8 },
      { percentile: 70, value: 4 },
      { percentile: 80, value: 2 },
      { percentile: 90, value: 4 },
      { percentile: 95, value: 2 },
      { percentile: 100, value: 1 }
    ];

    const getValue = (targetPercentile) => {
      const leftPoint = baseData.find(d => d.percentile <= targetPercentile) || baseData[0];
      const rightPoint = baseData.find(d => d.percentile > targetPercentile) || baseData[baseData.length - 1];

      if (leftPoint.percentile === rightPoint.percentile) return leftPoint.value;

      const ratio = (targetPercentile - leftPoint.percentile) / (rightPoint.percentile - leftPoint.percentile);
      return leftPoint.value + ratio * (rightPoint.value - leftPoint.value);
    };

    const valueAtPercentile = getValue(percentile);
    const GAP_SIZE = 1;

    const beforePercentile = baseData
      .filter(d => d.percentile <= percentile)
      .concat([{
        percentile: percentile - GAP_SIZE,
        value: valueAtPercentile
      }]);

    const afterPercentile = [{
      percentile: percentile + GAP_SIZE,
      value: valueAtPercentile
    }].concat(baseData.filter(d => d.percentile > percentile));

    return { beforePercentile, afterPercentile };
  };

  useEffect(() => {
    setChartData(createSplitData(userPercentile));
  }, [userPercentile]);

  const CustomDot = ({ cx, cy, payload, dataKey }) => {
    const isActive = activePoint?.percentile === payload.percentile && activeLineId === dataKey;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 6 : 3}
        fill={isActive ? "#6C63FF" : "#fff"}
        stroke="#6C63FF"
        strokeWidth={isActive ? 2 : 1}
        style={{ zIndex: isActive ? 999 : 1 }}
      />
    );
  };

  const CustomActiveDot = ({ cx, cy }) => (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#6C63FF"
      stroke="#fff"
      strokeWidth={2}
      style={{ zIndex: 999 }}
    />
  );

  const getLabelPosition = () => {
    if (userPercentile >= 95) {
      return 'insideTopRight';
    } else if (userPercentile <= 5) {
      return 'insideTopLeft';
    }
    return 'top';
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          margin={{ top: 30, right: 40, left: 40, bottom: 20 }}
          onMouseMove={(e) => {
            if (e?.activePayload?.[0]) {
              setActivePoint(e.activePayload[0].payload);
              setActiveLineId(e.activePayload[0].dataKey);
            }
          }}
          onMouseLeave={() => {
            setActivePoint(null);
            setActiveLineId(null);
          }}
        >
          <XAxis
            dataKey="percentile"
            type="number"
            domain={[0, 100]}
            tickCount={5}
            stroke="#666"
            padding={{ left: 10, right: 10 }}
            tickSize={8}
            tickMargin={8}
          />

          <ReferenceLine
            x={userPercentile}
            stroke="#D1D5DB"
            strokeWidth={1}
            label={{
              value: "your percentile",
              position: getLabelPosition(),
              fill: "#6B7280",
              fontSize: 12,
              offset: -10
            }}
            style={{ zIndex: 1 }}
          />

          <Line
            data={chartData.beforePercentile}
            type="monotone"
            dataKey="value"
            stroke="#6C63FF"
            strokeWidth={1.5}
            dot={<CustomDot />}
            activeDot={<CustomActiveDot />}
            connectNulls
            isAnimationActive={false}
          />

          <Line
            data={chartData.afterPercentile}
            type="monotone"
            dataKey="value"
            stroke="#6C63FF"
            strokeWidth={1.5}
            dot={<CustomDot />}
            activeDot={false}
            connectNulls
            isAnimationActive={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow border border-gray-100">
                    <p className="text-base font-medium">{Math.round(data.percentile)}</p>
                    <p className="text-sm text-indigo-600">
                      numberOfStudent: {Math.round(data.value)} {/* Rounding the value */}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicPercentileChart;
