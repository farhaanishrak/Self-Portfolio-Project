"use client"

import type React from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import {
  ArrowDown,
  User,
  Sparkles,
  Rocket,
  Folder,
  Linkedin,
  Github,
  Globe,
  Monitor,
  Camera,
  Film,
  Music,
  Facebook,
  Instagram,
} from "lucide-react"
import TypewriterName from "@/components/typewriter-name"
import { useState, useRef, useEffect } from "react"
import { useSpring } from "framer-motion"

export default function AboutPage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: mainRef })
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div className="min-h-screen overflow-auto" ref={mainRef}>
      {/* Home Section */}
      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center relative bg-background-dark overflow-hidden pt-16"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0 gradient-animation"
          style={{ opacity: backgroundOpacity }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 50, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Hey, I'm <TypewriterName />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Frontend Developer & Content Creator</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex space-x-4 justify-center"
          >
            <SocialButton icon={<Folder />} href="https://www.playbook.com/s/farhaanishrak/portfolio" />
            <SocialButton icon={<Linkedin />} href="https://linkedin.com/in/farhaanishrak" />
            <SocialButton icon={<Github />} href="https://github.com/farhaanishrak" />
            <SocialButton icon={<Facebook />} href="https://facebook.com/farhaanishrak" />
            <SocialButton icon={<Instagram />} href="https://instagram.com/farhaanishrak" />
            <SocialButton
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              }
              href="https://open.spotify.com/user/tmi0kf0xbpkm3m35n5goet19j?si=e5b828c962144c09"
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 text-white z-10"
        >
          <ArrowDown className="animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="min-h-screen bg-background-dark relative overflow-hidden py-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.2, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]"
            style={{ top: "10%", left: "5%" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[80px]"
            style={{ bottom: "5%", right: "10%" }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 py-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-white">About Me</span>
          </motion.h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Interactive profile image - 5 columns on desktop */}
            <motion.div
              className="md:col-span-5 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InteractiveProfileImage />
            </motion.div>

            {/* About content - 7 columns on desktop */}
            <div className="md:col-span-7 space-y-4">
              {/* Bio cards */}
              <AboutCard icon={<User className="text-accent" size={24} />} title="Who I Am" delay={0.3}>
                <p className="text-gray-300">
                  Comp-Sci student at BRAC University with a passion for software development, content creation,
                  business development and AI.
                </p>
              </AboutCard>

              <AboutCard icon={<Sparkles className="text-accent" size={24} />} title="What I Do" delay={0.5}>
                <p className="text-gray-300">
                  Skilled in Front End Development, Photography/Videography, Video Editing, and Graphic Design, I excel
                  in collaborating with teams, solving problems, and delivering impactful results.
                </p>
              </AboutCard>

              <AboutCard icon={<Rocket className="text-accent" size={24} />} title="My Goals" delay={0.7}>
                <p className="text-gray-300">
                  Committed to growth, I aim to contribute effectively while continuously learning and expanding my
                  skills in technology and creative fields.
                </p>
              </AboutCard>

              {/* Interests section */}
              <motion.div
                className="glass-card p-4 rounded-xl relative overflow-hidden mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3 text-white">Interests & Hobbies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <InterestBadge icon={<Globe />} text="Geography" />
                  <InterestBadge icon={<Rocket />} text="Outer Space" />
                  <InterestBadge icon={<Monitor />} text="Technology" />
                  <InterestBadge icon={<Camera />} text="Photography" />
                  <InterestBadge icon={<Film />} text="Movies & Anime" />
                  <InterestBadge icon={<Music />} text="Curated Music" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 glass-card rounded-full shadow-md text-accent hover:text-white hover:bg-accent transition-colors"
    >
      {icon}
    </motion.a>
  )
}

// Interactive Profile Image Component
function InteractiveProfileImage() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // Calculate mouse position relative to the center of the element
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    setMouseX(x)
    setMouseY(y)
  }

  const resetPosition = () => {
    setMouseX(0)
    setMouseY(0)
  }

  // Spring animation for smoother movement
  const rotateX = useSpring(0)
  const rotateY = useSpring(0)

  useEffect(() => {
    rotateX.set(-mouseY * 15) // Invert Y for natural tilt
    rotateY.set(mouseX * 15)
  }, [mouseX, mouseY, rotateX, rotateY])

  return (
    <motion.div
      className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-accent/30"
        style={{ borderWidth: "1px", borderStyle: "dashed", z: 1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-6 rounded-full border-2 border-accent/50"
        style={{ borderWidth: "2px", z: 2 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-12 rounded-full bg-accent/10 backdrop-blur-sm"
        style={{ z: 3 }}
        animate={{
          boxShadow: [
            "0 0 20px 0px rgba(var(--color-accent-rgb), 0.3)",
            "0 0 30px 5px rgba(var(--color-accent-rgb), 0.4)",
            "0 0 20px 0px rgba(var(--color-accent-rgb), 0.3)",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Profile image */}
      <motion.div
        className="absolute inset-12 rounded-full overflow-hidden border-2 border-accent"
        style={{ z: 4, transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        <img src="/profile-image.png" alt="Profile" className="w-full h-full object-cover" />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ z: 5 }}
      >
        {/* Accent dots at cardinal points */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

function AboutCard({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      className="glass-card p-4 rounded-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(var(--color-accent-rgb), 0.3)",
      }}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-xl font-semibold ml-2 text-white">{title}</h3>
      </div>

      {children}
    </motion.div>
  )
}

function InterestBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 border border-accent/20"
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(var(--color-accent-rgb), 0.2)",
        borderColor: "rgba(var(--color-accent-rgb), 0.5)",
      }}
    >
      <span className="text-accent">{icon}</span>
      <span className="text-sm text-white">{text}</span>
    </motion.div>
  )
}
