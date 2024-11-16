import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PointsAnimation = ({ points }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000); // Animation lasts 1 second
    return () => clearTimeout(timer);
  }, [points]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-10 right-10 px-4 py-2 rounded shadow-lg text-white ${
            points > 0 ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {points > 0 ? `+${points} pts` : `${points} pts`}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PointsAnimation;
