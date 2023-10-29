/* eslint-disable jsx-a11y/img-redundant-alt */
import avengers from "../assets/img/avengers.webp";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.main
      className="home"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
    >
      <img src={avengers} alt="image de spiderman" />
    </motion.main>
  );
}
