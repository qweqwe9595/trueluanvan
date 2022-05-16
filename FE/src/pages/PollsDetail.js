import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MovieDetailWall from "../components/smallSections/MovieDetailWall";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/User/UserContext";

function PollsDetail() {
  const params = useParams().id;
  const [poll, setPoll] = useState({});
  const [userId,setUserId]=  useState('')
  const [user] = useContext(UserContext);
  const [isVote,setIsVote]=useState(false)

  useEffect(()=>{
    if(!user) return 
    setUserId(user._id)
  },[user])

  useEffect(() => {
    const getPoll = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/polls/getone/${params}`
      );
      setIsVote(res.data.options.some(item=>item.optionVotes.some(e=>e.userId===userId)))
      setPoll(res.data);
      console.log(res.data)

    };
    getPoll();
    
  }, [params,userId]);

  const vote = async (optionId) => {
    const res = await axios.post(
      "http://localhost:5000/api/polls/addvote",
      {optionId},
      { headers: {token:user?.token} }
    );
    setIsVote(res.data.voted)
  };

  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple min-h-screen">
      <TopNav></TopNav>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10 ">
        <MovieDetailWall content={`${poll?.pollsName}`} />
        <div>
          <p className="capitalize text-xl">{poll?.pollDesc}</p>
          <div className="flex flex-col gap-3">
            {poll?.options?.map((item) => {
              const voted = item.optionVotes.some(item=>item.userId === userId)
              return (
                <div
                  className={voted?`flex gap-2 hover:bg-mainRed p-2 cursor-pointer border border-mainRed`:`flex gap-2 hover:bg-mainRed p-2 cursor-pointer`}
                  onClick={() => {
                    if(isVote) return 
                    vote(item._id);
                  }}
                >
                  <img
                    src={`http://localhost:5000/images/${item?.optionImg}`}
                    alt=""
                    className="h-20 w-20 object-cover"
                  />
                  <p>{item?.optionName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-screen max-w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default PollsDetail;
