import React from "react";
import "./About.css";
export default function About(){
    return(
        <>
            <h1 className="about-us-title">About Us</h1> {/* New Heading */}
            <section className="about-us">
                <div className="content">
                    <h1>What is Vistopia?</h1>
                    <p id="txt">
                    Vistopia is your ultimate travel companion, helping you plan smarter, more affordable journeys. Just enter your pickup and destination locations, and our AI instantly finds the most economical transport options tailored to your needs.
                    </p>
                    <p>
                    But we don’t stop at travel. Vistopia recommends budget-friendly hotels near your destination and highlights must-visit attractions around your stay.
                    </p>
                    <p>
                    Powered by intelligent algorithms and enriched by local communities, Vistopia also unlocks hidden gems, local food spots, and offbeat experiences shared by residents—so you can explore beyond the typical tourist trail.
                    </p>
                    <a href="#" className="btn">Our Journey</a>
                </div>
            </section>
      <div class="cofounders-container">
  <div class="cofounder-card align-left">
    <div class="cofounder-image sarthk"></div>
    <div class="cofounder-info">
      <h2>Sarthk Kharwal</h2>
      <p>A first-year B.Tech student at VIPS, IPU, New Delhi, with a keen interest in web development and frontend programming. </p> <p> Proficient in Java, with hands-on problem-solving experience on platforms like LeetCode. Skilled in modern web technologies, including React (backend), HTML, CSS, and C, bringing versatility and efficiency to software development. Dedicated to continuous learning and growth in the field of technology.
      </p>
    </div>
  </div>

  <div class="cofounder-card align-right">
    <div class="cofounder-image atharva"></div>
    <div class="cofounder-info">
      <h2>Atharva Singh</h2>
      <p>A first-year B.Tech student at VIPS, IP University, New Delhi, Atharva is a dedicated learner with a growing interest in web development and backend technologies. Proficient in C++ with hands-on problem-solving experience on LeetCode, he is building a strong foundation in modern web development.</p>

       <p> Atharva's technical expertise includes HTML, python, CSS, and backend technologies like Node.js, showcasing his versatility in both frontend and backend development.</p>
    </div>
  </div>

  <div class="cofounder-card align-left">
    <div class="cofounder-image rudra"></div>
    <div class="cofounder-info">
      <h2>Rudra Pratap Singh</h2>
      <p>A first-year B.Tech student at VIPS, IPU, New Delhi, with a strong interest in web development and Java programming, complemented by hands-on problem-solving experience on platforms like LeetCode. Skilled in video editing and graphic design, leveraging tools such as Photoshop, Canva, Figma, and DaVinci Resolve. </p> <p>Proficient in foundational programming languages and web technologies, including C, HTML, CSS, and Java. Dedicated to combining creative and technical skills to deliver innovative solutions.</p>
    </div>
  </div>

  <div class="cofounder-card align-right">
    <div class="cofounder-image sanidhya"></div>
    <div class="cofounder-info">
      <h2>Sanidhya Shishodia</h2>
      <p>A first-year B.Tech student at VIPS, IPU, New Delhi, with a keen interest in web development and frontend programming. </p> <p> Proficient in Java, with hands-on problem-solving experience on platforms like LeetCode. Skilled in modern web technologies, including React (front-end), HTML, CSS, and C, bringing versatility and efficiency to software development. Dedicated to continuous learning and growth in the field of technology.
      </p>
    </div>
  </div>

  <div class="cofounder-card align-left">
    <div class="cofounder-image vidisha"></div>
    <div class="cofounder-info">
      <h2>Vidisha Deswal</h2>
      <p>A first-year B.Tech student at IGDTUW, New Delhi, with a strong interest in web development and programming. Proficient in HTML, CSS, JavaScript, React JS and Java, and actively solving algorithmic problems on platforms like LeetCode. Also familiar with Python, combining technical expertise with creativity to build functional and visually appealing web experiences.</p>

       <p> Continuously exploring new technologies and passionate about growing in the field of software development.</p>
    </div>
  </div>
</div>
        </>
    )
}