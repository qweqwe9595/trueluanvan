import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "../NewsCard";
import StatusCard from "../StatusCard";
import RatesChart from "../RatesChart";

function Rates() {
  const [amountOfNewsToday, setAmountOfNewsToday] = useState(0);
  const [amountOfNewsWeek, setAmountOfNewsWeek] = useState(0);
  const [amountOfNewsYear, setAmountOfNewsYear] = useState(0);
  const [statisticOfMonth, setStatisticOfMonth] = useState([]);
  useEffect(() => {
    const getAmount = async () => {
      try {
        const resToday = await axios.get(
          "http://localhost:5000/api/statistics/rates?query=day"
        );
        const resWeek = await axios.get(
          "http://localhost:5000/api/statistics/rates?query=week"
        );
        const resYear = await axios.get(
          "http://localhost:5000/api/statistics/rates?query=year"
        );
        const resMonth = await axios.get(
          "http://localhost:5000/api/statistics/rates?query=month"
        );
        console.log(resToday.data.ratesQuery);
        setAmountOfNewsToday(resToday.data.ratesQuery);
        setAmountOfNewsWeek(resWeek.data.ratesQuery);
        setAmountOfNewsYear(resYear.data.ratesQuery);
        setStatisticOfMonth(resMonth.data.ratesQuery);
      } catch (error) {
        console.log(error.response);
      }
    };
    getAmount();
  }, []);
  return (
    <>
      <div className="bg-white pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <StatusCard
              color="pink"
              icon="stars"
              title="Amount Of News Today"
              amount={amountOfNewsToday}
            />
            <StatusCard
              color="purple"
              icon="stars"
              title="Amount Of News This Week"
              amount={amountOfNewsWeek}
            />
            <StatusCard
              color="orange"
              icon="stars"
              title="Amount Of News This Year"
              amount={amountOfNewsYear}
            />
            <StatusCard
              color="blue"
              icon="stars"
              title="Performance"
              amount={statisticOfMonth[0]}
              percentage={
                statisticOfMonth[0] - statisticOfMonth[1] >= 0
                  ? statisticOfMonth[0] - statisticOfMonth[1]
                  : statisticOfMonth[1] - statisticOfMonth[0]
              }
              // percentageIcon="arrow_upward"
              percentageIcon={
                statisticOfMonth[0] - statisticOfMonth[1] >= 0
                  ? "arrow_upward"
                  : "arrow_downward"
              }
              percentageColor="green"
              date="Since last month"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <RatesChart data={statisticOfMonth} name={`rates`} />
      </div>
    </>
  );
}

export default Rates;
