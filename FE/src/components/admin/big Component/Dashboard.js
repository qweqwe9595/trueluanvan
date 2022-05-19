import StatusCard from "../StatusCard";
import ChartLine from "../ChartLine";
import ChartBar from "../ChartBar";
import PageVisitsCard from "../PageVisitsCard";
import TrafficCard from "../TrafficCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataRates, setDataRates] = useState([]);
  const [dataReviews, setDataReviews] = useState([]);

  useEffect(() => {
    const getStatisticUsers = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/statistics/users?query=month"
      );
      setDataUsers(res.data.usersQuery);
    };
    const getStatisticRates = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/statistics/rates?query=month"
      );
      setDataRates(res.data.ratesQuery);
    };
    const getStatisticReviews = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/statistics/reviews?query=month"
      );

      setDataReviews(res.data.reviewsQuery);
    };

    getStatisticUsers();
    getStatisticRates();
    getStatisticReviews();
  }, []);

  return (
    <>
      <div className="bg-lightPurple px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <ChartLine
                bg={`#870164`}
                data={dataUsers}
                name={`Users chart 6 months lately`}
              />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <ChartBar
                data1Name={`Rates`}
                data2Name={`Comment`}
                data1={dataRates}
                data2={dataReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
