"use client"

import { motion } from "framer-motion"

interface SkillRatingProps {
  rating: number // Rating out of 5
  animated?: boolean
}

export default function SkillRating({ rating, animated = true }: SkillRatingProps) {
  const fullCircles = Math.floor(rating)
  const hasHalfCircle = rating % 1 >= 0.5
  const emptyCircles = 5 - fullCircles - (hasHalfCircle ? 1 : 0)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const circleVariant = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  }

  const renderCircles = () => {
    const circles = []

    // Full circles
    for (let i = 0; i < fullCircles; i++) {
      circles.push(
        <motion.div
          key={`full-${i}`}
          variants={animated ? circleVariant : undefined}
          className="w-3 h-3 rounded-full bg-accent"
        />,
      )
    }

    // Half circle
    if (hasHalfCircle) {
      circles.push(
        <motion.div
          key="half"
          variants={animated ? circleVariant : undefined}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-transparent"
        />,
      )
    }

    // Empty circles
    for (let i = 0; i < emptyCircles; i++) {
      circles.push(
        <motion.div
          key={`empty-${i}`}
          variants={animated ? circleVariant : undefined}
          className="w-3 h-3 rounded-full border border-accent/30 bg-transparent"
        />,
      )
    }

    return circles
  }

  if (animated) {
    return (
      <motion.div
        className="flex space-x-1.5"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {renderCircles()}
      </motion.div>
    )
  }

  return <div className="flex space-x-1.5">{renderCircles()}</div>
}
