import { useEffect, useState } from 'react';
import axios from 'axios';

const useMetricFetcher = (user) => {
  const [userIdentification, setuserIdentification] = useState(null);
  const [repPoints, setrepPoints] = useState(null);
  const [daysJoin, setdaysJoin] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user) return; // If user is not available, exit

        const response = await axios.get(`http://localhost:8000/userprofile/metrics/${user}`);
        const membershipTimeInsert = response.data.memberJoinDate;
        const repPointsInsert = response.data.rep;

        setuserIdentification(user);
        setrepPoints(repPointsInsert);

        const joinDate = new Date(membershipTimeInsert);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - joinDate;
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const daysSinceJoin = Math.floor(differenceInMilliseconds / millisecondsInADay);
        
        setdaysJoin(daysSinceJoin);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [user]);

  return { userIdentification, repPoints, daysJoin };
};

export default useMetricFetcher;
