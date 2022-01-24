import "./polllist.css";

const PollList = () => {
  //Fake Data
  const userData = [
    {
      username: "test0000",
    },
    {
      username: "test0001",
    },
    {
      username: "test0002",
    },
    {
      username: "test0003",
    },
    {
      username: "test0004",
    },
    {
      username: "test0005",
    },
    {
      username: "test0006",
    },
    {
      username: "test0007",
    },
    
  ];
  return (
    <main className="poll-container">
      <div className="poll-title">Poll List</div>
      <div className="poll-userlist">
        {userData.map((user) => {
          return (
            <div className="user-container">
              <div className="poll-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default PollList;