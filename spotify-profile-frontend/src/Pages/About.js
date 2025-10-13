// About.js
import React from "react";

const About = () => {
  return (
    <div className="about-page container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">Spotify Profiler</h1>
        <p className="lead">
          Explore detailed insights about artists and their music through a sleek, intuitive interface.
        </p>
      </header>

      {/* What is Spotify Profiler */}
      <section className="m-5 p-4">
        <h2 className="h3 fw-semibold mb-3">What is Spotify Profiler?</h2>
        <p className="fs-5">
          <strong>Spotify Profiler</strong> is a dynamic web application that connects to <strong>Spotify's Web API</strong> to display key information such as albums, singles, top tracks, popularity metrics, and follower counts. It provides a clean and intuitive interface, making it easy for music enthusiasts and industry professionals to explore an artist’s impact.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="m-5 p-4">
        <h2 className="h3 fw-semibold mb-3">Tech Stack & Highlights</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 tech__card">
              <div className="card-body">
                <h3 className="card-title h5 fw-bold mb-3 tech__title">FastAPI (Backend)</h3>
                <p className="card-text fs-6">
                  Handles API requests, processes Spotify data, and serves it efficiently to the frontend. FastAPI provides high performance and automatic documentation for seamless backend management.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 tech__card">
              <div className="card-body">
                <h3 className="card-title h5 fw-bold mb-3 tech__title">React (Frontend)</h3>
                <p className="card-text fs-6">
                  Provides a responsive and interactive user interface, fetching data in real time and presenting it in a visually appealing way.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4">
          <h4 className="fw-semibold mb-2">Key Skills Demonstrated:</h4>
          <ul className="list-unstyled fs-6">
            <li>- Full-stack web development with Python and JavaScript</li>
            <li>- Integration with third-party APIs (Spotify Web API)</li>
            <li>- Dynamic data fetching and UI rendering</li>
            <li>- Clean, modern frontend design</li>
          </ul>
        </div>
      </section>

      {/* Closing Note */}
      <section className="text-center m-4 p-4">
        <p className="fs-5">
          Spotify Profiler demonstrates the ability to build a complete, user-focused web application while leveraging real-world APIs—showcasing both technical skill and product design.
        </p>
      </section>

      <section className="text-center m-4 p-4">
        <p className="fs-5">
          More of my work can be found at <a target="_blank" rel="noreferrer" href="https://mjclifford.com" style={{ color: "#aaa"}}>MJClifford.com</a>
        </p>
      </section>
    </div>
  );
};

export default About;
