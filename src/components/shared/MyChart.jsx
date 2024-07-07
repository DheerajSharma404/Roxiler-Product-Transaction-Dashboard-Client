/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import React from "react";
import { toast } from "sonner";
import { getBarChartStats } from "../../api/productTransation";
import { ChartContainer } from "../ui/chart";
const MyChart = ({ month }) => {
  const [BarChartStats, setBarChartStats] = React.useState(null);

  const BarChartData = [];
  for (let key in BarChartStats?.data) {
    BarChartData.push({ range: key, value: BarChartStats?.data[key] });
  }

  const chartConfig = {
    desktop: {
      label: "BarChartData",
      color: "#15E8EA",
    },
  };

  const fetechBarChartStats = async () => {
    try {
      const stats = await getBarChartStats(month);
      setBarChartStats(stats);
      toast.success(stats?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  React.useEffect(() => {
    fetechBarChartStats();
  }, [month]);

  return (
    <div>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
        <BarChart accessibilityLayer data={BarChartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='range'
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value}
          />
          <YAxis dataKey='value' />
          <Bar dataKey='value' fill='var(--color-desktop)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default MyChart;
