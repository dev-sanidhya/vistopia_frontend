import React from "react";
import "./About.css";
import sarthk from "../public/Sarthk.jpg";
import atharva from "../public/Atharva.jpg";
import rudra from "../public/Rudra.jpg";
import sanidhya from "../public/Sanidhya.jpg";
import vidisha from "../public/Vidisha.jpg";
export default function About() {
  return (
    <>
<<<<<<< HEAD
      <h1 classNameName="about-us-title">About Us</h1> {/* New Heading */}
      <section classNameName="about-us">
        <div classNameName="content">
=======
      <h1 className="about-us-title">About Us</h1> {/* New Heading */}
      <section className="about-us">
        <div className="content">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
          <h1>What is Vistopia?</h1>
          <p id="txt">
            Vistopia is your ultimate travel companion, helping you plan
            smarter, more affordable journeys. Just enter your pickup and
            destination locations, and our AI instantly finds the most
            economical transport options tailored to your needs.
          </p>
          <p>
            But we don’t stop at travel. Vistopia recommends budget-friendly
            hotels near your destination and highlights must-visit attractions
            around your stay.
          </p>
          <p>
            Powered by intelligent algorithms and enriched by local communities,
            Vistopia also unlocks hidden gems, local food spots, and offbeat
            experiences shared by residents—so you can explore beyond the
            typical tourist trail.
          </p>
<<<<<<< HEAD
          <a href="#" classNameName="btn">
=======
          <a href="#" className="btn">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
            Our Journey
          </a>
        </div>
      </section>
<<<<<<< HEAD
      <div className="cofounders-container">
        <div className="cofounder-card align-left">
          <div className="cofounder-image sarthk">
            <img
              classNameName="1"
              src={sarthk}
              alt="Sarthk Kharwal"
              width={150}
            />
          </div>
          <div className="cofounder-info">
=======
      <div class="cofounders-container">
        <div class="cofounder-card align-left">
          <div class="cofounder-image sarthk">
            <img className="1" src={sarthk} alt="Sarthk Kharwal" width={150} />
          </div>
          <div class="cofounder-info">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
            <h2>Sarthk Kharwal</h2>
            <p>
              Third year undergrad student pursuing B.Tech at VIPS, IPU, New
              Delhi. Full stack developer who likes to get his hands dirty with
              javascript and python, bringing end-to-end full stack ideas to
              life{" "}
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="cofounder-card align-right">
          <div className="cofounder-image atharva">
            <img
              classNameName="2"
              src={atharva}
              alt="Atharva Singh"
              width={150}
            />
          </div>
          <div className="cofounder-info">
=======
        <div class="cofounder-card align-right">
          <div class="cofounder-image atharva">
            <img className="2" src={atharva} alt="Atharva Singh" width={150} />
          </div>
          <div class="cofounder-info">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
            <h2>Atharva Singh</h2>
            <p>
              A first-year B.Tech student at VIPS, IP University, New Delhi,
              Atharva is a dedicated learner with a growing interest in web
              development and backend technologies. Proficient in C++ with
              hands-on problem-solving experience on LeetCode, he is building a
              strong foundation in modern web development.
            </p>

            <p>
              {" "}
              Atharva's technical expertise includes HTML, python, CSS, and
              backend technologies like Node.js, showcasing his versatility in
              both frontend and backend development.
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="cofounder-card align-left">
          <div className="cofounder-image rudra">
            <img
              classNameName="3"
=======
        <div class="cofounder-card align-left">
          <div class="cofounder-image rudra">
            <img
              className="3"
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
              src={rudra}
              alt="Rudra Pratap Singh"
              width={150}
            />
          </div>
<<<<<<< HEAD
          <div className="cofounder-info">
=======
          <div class="cofounder-info">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
            <h2>Rudra Pratap Singh</h2>
            <p>
              A first-year B.Tech student at VIPS, IPU, New Delhi, with a strong
              interest in web development and Java programming, complemented by
              hands-on problem-solving experience on platforms like LeetCode.
              Skilled in video editing and graphic design, leveraging tools such
              as Photoshop, Canva, Figma, and DaVinci Resolve.{" "}
            </p>{" "}
            <p>
              Proficient in foundational programming languages and web
              technologies, including C, HTML, CSS, and Java. Dedicated to
              combining creative and technical skills to deliver innovative
              solutions.
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="cofounder-card align-right">
          <div className="cofounder-image sanidhya">
            <img classNameName="4" src={sanidhya} alt="Sanidhya" width={150} />
          </div>
          <div className="cofounder-info">
=======
        <div class="cofounder-card align-right">
          <div class="cofounder-image sanidhya">
            <img className="4" src={sanidhya} alt="Sanidhya" width={150} />
          </div>
          <div class="cofounder-info">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
            <h2>Sanidhya Shishodia</h2>
            <p>
              A first-year B.Tech student at VIPS, IPU, New Delhi, with a keen
              interest in web development and frontend programming.{" "}
            </p>{" "}
            <p>
              {" "}
              Proficient in Java, with hands-on problem-solving experience on
              platforms like LeetCode. Skilled in modern web technologies,
              including React (front-end), HTML, CSS, and C, bringing
              versatility and efficiency to software development. Dedicated to
              continuous learning and growth in the field of technology.
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="cofounder-card align-left">
          <div className="cofounder-image vidisha">
            <img
              classNameName="5"
              src={vidisha}
              alt="Vidisha Deswal"
              width={150}
            />
          </div>
          <div className="cofounder-info">
=======
        <div class="cofounder-card align-left">
          <div class="cofounder-image vidisha">
            <img className="5" src={vidisha} alt="Vidisha Deswal" width={150} />
          </div>
          <div class="cofounder-info">
>>>>>>> 4aaec25f752ac3cc3b48b25e233c9a1beeb936a6
            <h2>Vidisha Deswal</h2>
            <p>
              A first-year B.Tech student at IGDTUW, New Delhi, with a strong
              interest in web development and programming. Proficient in HTML,
              CSS, JavaScript, React JS and Java, and actively solving
              algorithmic problems on platforms like LeetCode. Also familiar
              with Python, combining technical expertise with creativity to
              build functional and visually appealing web experiences.
            </p>

            <p>
              {" "}
              Continuously exploring new technologies and passionate about
              growing in the field of software development.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
