import React, { useState, useEffect } from "react";

function App() {
  let [userId, setUserId] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    fetch(url)
      .then((response) => {
        console.log("RESPONSE", response);
        return response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        setData(data);
      });
  }, [userId]);

  useEffect(() => {
    document.addEventListener("mousemove", findCordinates);

    return () => {
      document.removeEventListener("mousemove", findCordinates);
    };
  });

  function findCordinates(event) {
    console.log("Cordinates", event.clientX);
  }

  function changeUserId() {
    userId = userId + 1;
    console.log("UserId", userId);
    setUserId(userId);
  }

  return (
    <div className="App" style={{ padding: 10 }}>
      <button onClick={changeUserId}>Change userId</button>
      {data.map((user) => (
        <div>
          <p>{user.title}</p>
        </div>
      ))}
    </div>
  );

  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // function handleChange(e) {
  //   setEmail(e.target.value);
  // }
  // function handleChangeName(e) {
  //   setName(e.target.value);
  // }
  // return (
  //   <div className="App" style={{ padding: 10 }}>
  //     <input onChange={handleChange} />
  //     <br />
  //     <input onChange={handleChangeName} />
  //     <p>Email: {email}</p>
  //     <p>Name: {name}</p>
  //   </div>
  // );
}

export default App;
