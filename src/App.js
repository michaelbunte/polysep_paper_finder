import logo from './logo.svg';
import './App.css';
import json_data from './papers.json';
import { useState } from 'react';

function App() {
  const find_realistic_date = (str) => {
    const match = str.match(re);
    if (match == null) { return 0;}
    if (match.length < 2) { return 0;}
    let matchNum = parseInt(match[1]);
    if(matchNum >= REALISTIC_DATE_MIN && matchNum <= REALISTIC_DATE_MAX) {
      return matchNum;
    }
    return find_realistic_date(str.slice(match.index + 3, str.length));
  }

  const year_sort = (str1, str2) => {
    const val1 = find_realistic_date(str1);
    const val2 = find_realistic_date(str2);
    return val2 - val1;
  };

  const re = /(?:\D|^)(\d{4})(?=\D|$)/;
  const REALISTIC_DATE_MIN = 1970;
  const REALISTIC_DATE_MAX = 2025;

  let [searchText, setSearchText] = useState("");
  let [selectedPapers, setSelectedPapers] = useState([]);
  let filtered_data = json_data
    .filter(name => name.toLowerCase().includes(searchText))
    .sort(year_sort);

  
  const f = filtered_data.map((str) => {
    const match = str.match(re);
    if (match == null) { return "0";}
    if (match.length < 2) { return "0";}
    return match[1];
  })
  console.log(f);

  let handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  let handleAddPress = (e) => {
    console.log(selectedPapers)
    let item_index = parseInt(e.target.name.split('_')[1]);
    if (selectedPapers.includes(filtered_data[item_index])) { return; }

    setSelectedPapers([...selectedPapers, filtered_data[item_index]]);
  }

  let handleRemovePress = (e) => {
    let item_index = parseInt(e.target.name.split('_')[1]);
    setSelectedPapers([...selectedPapers.slice(0, item_index), ...selectedPapers.slice(item_index + 1, selectedPapers.length)]);
  }



  let papers = filtered_data.map((paper, index) => {
    return (
      <div style={{ padding: "3px", display: "flex", background: "lightgreen", margin: "1px" }}>
        <input
          type="button"
          style={{ marginRight: "10px", height: "20px" }}
          value="Add"
          name={`add_${index}`}
          key={`add_${index}`}
          onClick={handleAddPress} />
        {paper}
      </div>
    )
  })

  let chosenPapers = selectedPapers.map((paper, index) => {
    return (
      <div style={{ padding: "3px", display: "flex", background: "lightblue", margin: "1px" }}>
        <input
          type="button"
          style={{ marginRight: "10px", height: "20px" }}
          value="Remove"
          name={`remove_${index}`}
          key={`remove_${index}`}
          onClick={handleRemovePress} />
        {paper}
      </div>
    )
  })

  return (
    <div >
      <button onClick={() => {
        let output = "";
        selectedPapers.map((paper) => { output += paper + "\n\n"; })
        console.log(output);
        navigator.clipboard.writeText(output);
      }}>
        Copy selected papers to clipboard
      </button>
      <form>
        <input
          placeholder='Search'
          type="text"
          style={{ margin: "20px" }}
          onChange={handleSearchChange} />
      </form>

      <div style={{ display: "flex" }}>
        <div style={{ padding: "20px", flex: "1" }}>
          <h2>Available Papers</h2>
          {papers}
        </div>
        <div style={{ padding: "20px", flex: "1" }}>
          <h2>Selected Papers</h2>
          {chosenPapers}
        </div>
      </div>
    </div>
  );
}

export default App;
