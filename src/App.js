import { useState } from 'react'

function App() {

  const [info, setInfo]= useState({
    name:'Jacob',
    age: 24,
    address: 'Hà Nội'
  });

  const handleUpdate = () => {
    setInfo(
      pre => ({
        ...pre,
        name: 'Jacob Lưu',
        bio: 'Hello'
      }))
  }
  return (
    <div className='App' style={{padding:20}}>
      <h1>{JSON.stringify(info)}</h1>
      <button onClick = {handleUpdate}>Update</button>

    </div>
  );
}

export default App;
