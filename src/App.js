import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// components
import Group from './components/Group'

function App() {

  const [dataState, setDataState] = useState([
    {
      data: {
        imageUrls: ['https://bryansandbox.imgix.net/delete/otrium/imgix/Model_not_centered.tif?w=467&h=700']
      }
    }
  ]);

  let params = window.location.search;
  if (params) {
    // if params, do something
  }

  const handleOnBlur = (event, groupIndex, imageIndex) => {
    let newState = [...dataState];
    newState[groupIndex].data.imageUrls[imageIndex] = event.target.value;
    setDataState(newState);
  };

  const addNewImage = (groupIndex) => {
    let newState = [...dataState];
    console.log()
    console.log('newState[groupIndex].data.imageUrls[0] is: ',newState[groupIndex].data.imageUrls[0])
    newState[groupIndex].data.imageUrls.push(newState[groupIndex].data.imageUrls[0]);
    setDataState(newState);
  }

  const _renderGroups = () => {
    return Object.entries(dataState).map(x => {
      let [groupIndex, object] = x;
      return <Group 
      groupIndex={groupIndex} 
      data={object.data} 
      handleOnBlur={handleOnBlur}
      addNewImage={addNewImage}
      ></Group>
    })
  }


  return (
    <div className="app">
      {_renderGroups()}
      <button className="addImage" onClick={()=>{
          addNewImage(0)
      }}>Add another image</button>
    </div>
  )
}

export default App;