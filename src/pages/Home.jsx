import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStackShowcase from "./TechStackDisplay";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const h3Ref = useRef(null);
  const sectionRef = useRef(null);
  const spiralRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  window.scrollTo(0,0); 

  // Animated text effect
  useEffect(() => {
    if (!h3Ref.current) return;

    const splitText = new SplitType(h3Ref.current, { types: "words" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: h3Ref.current,
          start: "top 90%",
          end: "+=100%",
          scrub: 1,
        },
      })
      .fromTo(
        splitText.words,
        { color: "#ffcc66", opacity: 0.1 },
        { color: "#ff9966", opacity: 1, stagger: 0.1, duration: 1 }
      );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Rotating spiral effect
  useEffect(() => {
    if (!spiralRef.current) return;

    gsap.to(spiralRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="flex flex-col justify-center items-center text-center bg-black overflow-hidden pt-40"
      style={{
        background:
          "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* 🔹 Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col md:flex-row justify-center items-center w-full"
      >
        {/* Image Section on the Left */}
        <motion.img
          src="/PT_Pic.png" // Replace with your image path
          alt="Prashant's Image"
          className="w-60 h-fit md:h-[680px] md:w-1/2 object-cover shadow-lg z-50 md:-mt-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Text Section on the Right */}
        <div
          className="z-20 w-full flex justify-center md:justify-start md:w-1/2 text-center md:text-left md:ml-8 mt-16 mb-20 md:mb-32"
          
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 pb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey, I&apos;m Prashant Thakur! <br />
            <motion.span
              className="text-4xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Welcome to my digital space— <br /> where creativity meets code!
            </motion.span>
          </motion.h1>
        </div>
      </motion.div>

      {/* 🔹 Tech Stack Section */}
      <motion.div
        className="relative z-10 w-full flex justify-center h-auto mb-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <TechStackShowcase />
      </motion.div>

      {/* 🔹 About Section */}
      <motion.div
        id="about"
        className="relative z-10 w-full flex justify-center h-auto mb-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <About />
      </motion.div>
      {/* <About /> */}

      {/* 🔹 Projects Section */}
      <motion.div
        id="projects"
        className="relative z-10 w-full flex justify-center h-auto mb-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Projects setSelectedProject={setSelectedProject} />
      </motion.div>

      {/* 🔹 Contact Section */}
      <motion.div
        id="contact"
        className="relative z-10 w-full flex justify-center h-auto mb-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Contact />
      </motion.div>

      {/* 🔹 Background Effects */}
      <div className="fixed top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
      <div className="fixed bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>

      {/* 🔹 Rotating Spiral Background */}
      <div
        ref={spiralRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-10 pointer-events-none"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(255, 153, 102, 0),
            rgba(255, 153, 102, 0.3),
            rgba(255, 153, 102, 0.5),
            rgba(255, 153, 102, 0.3),
            rgba(255, 153, 102, 0)
          )`,
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      ></div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Home;
