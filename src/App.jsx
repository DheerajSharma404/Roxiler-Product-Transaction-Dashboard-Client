/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { toast, Toaster } from "sonner";
import { getAllTransaction } from "./api/productTransation";
import MyChart from "./components/shared/MyChart";
import StatisticsCards from "./components/shared/StatisticsCard";
import Table from "./components/shared/Table";
import { MONTHS } from "./constant";

const App = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectMonth, setSelectedMonth] = React.useState("March");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);

  const handleDropdownSelection = (e) => {
    setSelectedMonth(e.target.getAttribute("data-month"));
    setIsDropdownOpen(false);
    setPageNumber(1);
  };

  const handleNext = () => {
    setPageNumber((prev) => (prev < totalPage ? prev + 1 : prev));
  };
  const handlePrevious = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const fetchAllTransaction = async () => {
    try {
      const response = await getAllTransaction(
        selectMonth,
        pageNumber,
        searchQuery
      );
      setTransactions(response?.data?.transactions);
      setTotalPage(response?.data?.totalPageCount);
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  React.useEffect(() => {
    fetchAllTransaction();
  }, [selectMonth, pageNumber, searchQuery]);

  return (
    <>
      <Toaster richColors={true} />
      {/* header */}
      <div className=' flex flex-col  items-center justify-start bg-teal-100/50 overflow-scroll '>
        <div className='w-56 h-56 flex flex-col items-center justify-center  rounded-full text-2xl font-bold bg-white my-12'>
          <p>Transaction</p>
          <p>Dashboard</p>
        </div>
        {/* Search and Dropdown */}
        <div className='flex items-center justify-between   w-[80%] mb-4 '>
          <div>
            <input
              type='text'
              id='search'
              name='search'
              value={searchQuery}
              placeholder='Search Transaction'
              onChange={(e) => setSearchQuery(e.target.value)}
              className='text-xl bg-yellow-300/90 p-3 px-6 font-bold text-black rounded-full placeholder:text-black focus:outline-yellow-500'
            />
          </div>
          <div className=' relative bg-yellow-500 text-xl font-bold rounded-xl flex flex-col gap-4 '>
            <div
              className='p-3 px-4 w-56 overflow-hidden '
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <div>{selectMonth}</div>
              <div className='p-[10.9px] px-4 absolute  top-0 right-0  rounded-tr-xl rounded-br-xl bg-white text-yellow-300 text-3xl font-bold flex items-center justify-center'>
                <BsChevronDown />
              </div>
            </div>
            <div
              className={`${
                isDropdownOpen ? "block" : "hidden"
              } absolute top-14 rounded-xl bg-yellow-500 w-56 p-2 flex flex-col  h-56 overflow-scroll `}
              onClick={(e) => handleDropdownSelection(e)}
            >
              {MONTHS.map((month, index) => {
                return (
                  <div
                    key={index}
                    data-month={month}
                    className=' text-center py-2 rounded-xl border border-yellow-500 hover:bg-yellow-300/90  hover:border-white/10'
                  >
                    {month}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Table */}
        <Table transactionsData={transactions} />
        {/* Pagination */}
        <div className='h-12 w-[80%] flex items-center justify-between text-lg font-semibold'>
          <div>PageNumber: {pageNumber}</div>
          <div>
            <button onClick={handleNext}>Next</button>
            <span> - </span>
            <button onClick={handlePrevious}>Prvious</button>
          </div>

          <div>Per Page: 10</div>
        </div>
        {/* Statistic card */}
        <StatisticsCards month={selectMonth} />

        {/* Bar Chart */}
        <section className='w-[80%] py-10'>
          <h1 className='text-4xl font-bold pb-8'>
            Bar Chart Stats - {selectMonth}
          </h1>
          <MyChart month={selectMonth} />
        </section>
      </div>
    </>
  );
};

export default App;
