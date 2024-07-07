/* eslint-disable react/prop-types */
import { TABLE_HEADING } from "../../constant";

const Table = ({ transactionsData }) => {
  return (
    <div className='max-w-[80%] '>
      <table className='text-start w-full bg-yellow-300  rounded-3xl'>
        <thead className=' text-center w-full  '>
          <tr className='w-full  border-b-2 border-black'>
            {TABLE_HEADING.map((heading, index) => {
              return (
                <th
                  key={index}
                  className={`${
                    index === TABLE_HEADING.length - 1
                      ? ""
                      : "border-r-2 border-black"
                  } text-center p-4 px-6`}
                >
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {transactionsData?.map((transaction, index) => (
            <tr
              key={index}
              className={`${
                index === transactionsData.length - 1
                  ? ""
                  : "border-b-2 border-black"
              } `}
            >
              <td className='text-center rounded-tl-md rounded-bl-md p-2 border-r-2 border-black'>
                {transaction.id}
              </td>
              <td className='text-center p-2 border-r-2 border-black'>
                {transaction.title}
              </td>
              <td className='text-center p-2 border-r-2 border-black '>
                {transaction.description}
              </td>
              <td className='text-center p-2 border-r-2 border-black '>
                {transaction.price}
              </td>
              <td className='text-center p-2 border-r-2 border-black'>
                {transaction.category}
              </td>
              <td className='text-center p-2 border-r-2 border-black'>
                {String(transaction.sold)}
              </td>
              <td className='text-cneter  p-2 gap-6  '>
                <img
                  src={transaction.image}
                  alt=''
                  className='w-full h-full object-cover '
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
