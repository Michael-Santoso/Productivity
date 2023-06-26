import "./home.css";
import study from "./study.jpg";
function HomeMain() {
  return (
    <div className="wrapper">
      <img src={study} className="study"></img>
      <div className="title">Welcome to Productisite!</div>
      <div className="body">
        Built to increase your productivity. Feel free to explore the web.
      </div>
    </div>
  );
}

export default HomeMain;
