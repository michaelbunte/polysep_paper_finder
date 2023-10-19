import logo from './logo.svg';
import './App.css';
import json_data from './papers.json';
import { useState } from 'react';

function App() {

  let [searchText, setSearchText] = useState("");
  let [selectedPapers, setSelectedPapers] = useState([]);
  let filtered_data = json_data.filter(name => name.toLowerCase().includes(searchText));

  let handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  let handleAddPress = (e) => {
    console.log(selectedPapers)
    let item_index = parseInt(e.target.name.split('_')[1]);
    setSelectedPapers([...selectedPapers, filtered_data[item_index]]);
  }

  let handleRemovePress = (e) => {
    let item_index = parseInt(e.target.name.split('_')[1]);
    setSelectedPapers([...selectedPapers.slice(0, item_index), ...selectedPapers.slice(item_index + 1, selectedPapers.length)]);
  }



  let papers = filtered_data.map((paper, index) => {
    return (
      <div style={{ padding: "3px", display: "flex", background: "lightgreen", margin: "1px"}}>
        <input 
          type="button" 
          style={{ marginRight: "10px", height: "20px" }} 
          value="Add" 
          name={`add_${index}`}  
          key={`add_${index}`} 
          onClick={handleAddPress}/>
        {paper}
      </div>
    )
  })

  let chosenPapers = selectedPapers.map((paper, index) => {
    return (
      <div style={{ padding: "3px", display: "flex", background: "lightblue", margin: "1px"}}>
        <input 
          type="button" 
          style={{ marginRight: "10px", height: "20px" }} 
          value="Remove" 
          name={`remove_${index}`}  
          key={`remove_${index}`} 
          onClick={handleRemovePress}/>
        {paper}
      </div>
    )
  })

  return (
    <div >
      <form>
        <input 
          placeholder='Search'
          type="text" 
          style={{ margin: "20px" }} 
          onChange={handleSearchChange} />
      </form>

      <div style={{display: "flex"}}>
        <div style={{ padding: "20px", flex: "1" }}>
          <h2>Available Papers</h2>
          {papers}
        </div>
        <div style={{ padding: "20px", flex: "1"}}>
          <h2>Selected Papers</h2>
          {chosenPapers}
        </div>
      </div>
    </div>
  );
}

export default App;
