import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "../NewsCard";
import StatusCard from "../StatusCard";
import TableCard from "../TableCard";

export default function Dashboard() {
  const [amountOfNewsToday, setAmountOfNewsToday] = useState(0);
  const [amountOfNewsWeek, setAmountOfNewsWeek] = useState(0);
  const [amountOfNewsYear, setAmountOfNewsYear] = useState(0);
  const [statisticOfMonth, setStatisticOfMonth] = useState([]);
  useEffect(() => {
    const getAmount = async () => {
      const resToday = await axios.get(
        "http://localhost:5000/api/statistics/news?query=day"
      );
      const resWeek = await axios.get(
        "http://localhost:5000/api/statistics/news?query=week"
      );
      const resYear = await axios.get(
        "http://localhost:5000/api/statistics/news?query=year"
      );
      const resMonth = await axios.get(
        "http://localhost:5000/api/statistics/news?query=month"
      );
      setAmountOfNewsToday(resToday.data.newsQuery);
      setAmountOfNewsWeek(resWeek.data.newsQuery);
      setAmountOfNewsYear(resYear.data.newsQuery);
      setStatisticOfMonth(resMonth.data.newsQuery);
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
              icon="menu_book"
              title="Amount Of News Today"
              amount={amountOfNewsToday}
            />
            <StatusCard
              color="purple"
              icon="menu_book"
              title="Amount Of News This Week"
              amount={amountOfNewsWeek}
            />
            <StatusCard
              color="orange"
              icon="menu_book"
              title="Amount Of News This Year"
              amount={amountOfNewsYear}
            />
            <StatusCard
              color="blue"
              icon="menu_book"
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
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <NewsCard />
          </div>
        </div>
      </div>
    </>
  );
}
