import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Progress from "@material-tailwind/react/Progress";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TrafficCard() {
  const [topRate, setTopRates] = useState([]);
  useEffect(() => {
    const getMax = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/statistics/toprate"
      );
      setTopRates(res.data);
    };
    getMax();
  }, []);
  return (
    <Card>
      <CardHeader color="purple" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Top Review</h2>
        </div>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  UserName
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Review Count
                </th>
              </tr>
            </thead>
            <tbody>
              {topRate?.map((item) => {
                return (
                  <>
                    <tr>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {item?.userName || item?.email}
                      </th>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {item?.reviews?.length}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
