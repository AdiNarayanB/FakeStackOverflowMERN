
import React from 'react';
import '../stylesheets/index.css';
import useMetricFetcher from './UserMetricsFactory.js';
import { useEffect} from 'react';
// import UserHeader from './header_user';

export const UserProfile = ({user, onFormChange}) => {

  const { userIdentification, repPoints, daysJoin } = useMetricFetcher(user); //Facotry Pattern;
  useEffect(() => {
  }, [userIdentification, repPoints, daysJoin]);
 
    return (
        <>
            <div>
              <div className="welcome-style">
                <div className='welcome-header'>
                  Welcome to Your User Profile page {user}
                </div>
                <div className="user-metric-title">User Metrics</div>
                <div  id = '#viewUserMembership' className="user-membership"> Total FakeSO Membership Days: {daysJoin}</div>
                <div  id = '#viewUserRep'className="user-rep"> User Rep Points: {repPoints}</div>
                <button  id = '#viewUserAnswerLink' className="welcome-button" onClick={() => onFormChange('questions')}>questions</button>
                <button  id = '#viewUserTagsLink' className="welcome-button" onClick={() => onFormChange('tags')}>tags</button>
               <button   id = '#viewUserTagsLink' className="welcome-button" onClick={() => onFormChange('answers')}>answers</button>
              </div>
            </div>
          
        </>
      );
          }      