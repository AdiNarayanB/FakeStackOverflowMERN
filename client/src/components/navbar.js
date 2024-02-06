import React from 'react';
import '../stylesheets/index.css'; //Imported Style sheets

export default function Navbar({onActiveClick,onUnansweredClick,onNewestClick}){
    return (
        <div>
            <div className = "navbar-selector">
                <button onClick={onNewestClick} className="nav-bar-Btn" id="newestBtn">Newest</button>
                <button onClick={onActiveClick}  className="nav-bar-Btn" id="activeBtn">Active</button>
                <button onClick={onUnansweredClick}  className="nav-bar-Btn" id="unansweredBtn">Unanswered</button>
            </div>
        </div>
    );
}


  

 
  
 

  


