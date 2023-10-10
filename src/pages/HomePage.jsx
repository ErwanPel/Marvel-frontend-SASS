/* eslint-disable jsx-a11y/img-redundant-alt */
import spiderman from "../assets/img/spiderman.webp";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.main
      className="home"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1.2,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
    >
      <p>Welcome to the Marvel's fan site</p>
      <img src={spiderman} alt="image de spiderman" />
    </motion.main>
  );
}
