import logo from './img/logo-stackoverflow.png'; //import logo
import '../stylesheets/index.css';
import React from 'react';
// import data from '../models/model.js'; //Imported data

export default function Banner({user,filterText,onFilterTextChange}){
    //console.log("filter questions parent function", {filterText, onFilterTextChange})
    // const [filterText, setFilterText] = useState('');

    return (
        <div>
        
            <h2>Fake Stack Overflow</h2>
            <h3>Welcome {user}</h3>
            <div className="logo-selector">
                  <img src={logo} alt="StackOverflow Logo"/>     
            <div>
           
            <div id ="searchBar" className="searchBar">
                    <input type="text" style={{width:'800px',marginTop: '15px'}} placeholder="Search" id="searchTextBar" 
                    value={filterText} onChange={(e) => onFilterTextChange(e.target.value)}></input>
                </div>
            </div>
          </div>
        </div>
    );
}






