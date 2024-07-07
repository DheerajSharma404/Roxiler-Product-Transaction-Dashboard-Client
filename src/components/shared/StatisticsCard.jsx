/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "sonner";
import { getStatistics } from "../../api/productTransation";

const StatisticsCards = ({ month }) => {
  const [monthlyStats, setMonthlyStats] = React.useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics(month);
      setMonthlyStats(response?.data);
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  React.useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <section className='w-[80%] py-10'>
      <h1 className='text-4xl font-bold pb-8'>Statistic - {month}</h1>

      <div className='w-[400px] h-[200px] bg-yellow-300 rounded-3xl flex flex-col  p-4 px-6'>
        <div className=' text-2xl flex flex-1  items-center justify-between'>
          Total sale: <div>{monthlyStats?.totalSaleAmount}</div>
        </div>
        <div className=' text-2xl flex flex-1 items-center justify-between'>
          Total sold item: <div>{monthlyStats?.totalSoldItems}</div>
        </div>
        <div className=' text-2xl flex flex-1 items-center justify-between'>
          Total not sold item: <div>{monthlyStats?.totalNotSoldItems}</div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsCards;
