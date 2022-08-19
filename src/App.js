import {useEffect, useState} from "react";
import './App.css';
import axios from "axios"


export const CardUser = ({data}) => {
  console.log("data:", data)
  return (
      <div>
        <img src={data?.picture}/>
        <h1>{`Title: ${data?.title} - ${data?.firstName} ${data?.lastName}`} </h1>
      </div>
  )
}



function App() {
  const [getData, setGetData] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    axios({
      method: 'GET',
      url: "https://dummyapi.io/data/v1/user",
      headers: {"app-id": "62f253d4e4b4d5c1cabee6da"},
      params:{
        page,
        limit: 10
      }}).then(payload => {
      setGetData((prevState) => [...prevState, ...payload?.data?.data])
    })

  }, [page])

  const getPaginate = () => {
    setPage(page + 1)
  }


  return (
    <div className="App">
      {getData.map(items => <CardUser data={items}/>)}
      <button onClick={() => getPaginate()}>Next</button>
    </div>
  );
}

export default App;
