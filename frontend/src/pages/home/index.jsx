import React from "react";

const Home = () => {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="text-center display-1 fw-bold">
              {" "}
              Welcome to <br></br>Job Finder..!!<br></br>{" "}
            </h1>
            <br></br>
            <br></br>

            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-6">
                <button type="button" class="btn btn-lg btn-primary ml-5">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <img src="./home.png" height="100%" width="100%"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
