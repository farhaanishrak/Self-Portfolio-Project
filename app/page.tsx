"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Code, ExternalLink, Github, Linkedin, Mail, User, Folder } from "lucide-react"
import ThemeCustomizer from "@/components/theme-customizer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const mainRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: mainRef })
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollTop
    const windowHeight = window.innerHeight

    if (scrollPosition < windowHeight * 0.5) {
      setActiveSection("home")
    } else if (scrollPosition < windowHeight * 1.5) {
      setActiveSection("about")
    } else if (scrollPosition < windowHeight * 2.5) {
      setActiveSection("projects")
    } else if (scrollPosition < windowHeight * 3.5) {
      setActiveSection("skills")
    } else {
      setActiveSection("contact")
    }
  }

  return (
    <main
      ref={mainRef}
      className="h-screen overflow-auto snap-y snap-mandatory bg-background-dark text-text-light"
      onScroll={handleScroll}
    >
      <ThemeCustomizer />

      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full shadow-md">
          <NavItem id="home" active={activeSection === "home"} icon={<User size={18} />} />
          <NavItem id="about" active={activeSection === "about"} icon={<User size={18} />} />
          <NavItem id="projects" active={activeSection === "projects"} icon={<Code size={18} />} />
          <NavItem id="skills" active={activeSection === "skills"} icon={<Code size={18} />} />
          <NavItem id="contact" active={activeSection === "contact"} icon={<Mail size={18} />} />
        </div>
      </nav>

      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center snap-start relative bg-background-dark overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0 gradient-animation"
          style={{ opacity: backgroundOpacity }}
        ></motion.div>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Hello, I'm <span className="text-accent">Farhan Ishrak</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Frontend Developer & Designer</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex space-x-4 justify-center"
          >
            <SocialButton icon={<Folder />} href="https://www.playbook.com/s/farhaanishrak/portfolio" />
            <SocialButton icon={<Linkedin />} href="https://linkedin.com/in/farhaanishrak" />
            <SocialButton
              icon={<Mail />}
              href="mailto:farhanishrak12528@gmail.com?subject=Hello%20Farhan&body=I%20wanted%20to%20get%20in%20touch%20regarding%20a%20project."
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

      <section id="about" className="h-screen flex items-center justify-center snap-start bg-background-darker p-4">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative w-[360px] h-[360px]">
                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-accent/30"
                    style={{ borderWidth: "1px", borderStyle: "dashed" }}
                  ></motion.div>
                  {/* Middle rotating ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-6 rounded-full border-2 border-accent/50"
                    style={{ borderWidth: "2px" }}
                  ></motion.div>
                  {/* Inner glow */}
                  <div className="absolute inset-12 rounded-full bg-accent/10 backdrop-blur-sm"></div>
                  {/* Static image container */}
                  <div className="absolute inset-12 rounded-full overflow-hidden border-2 border-accent">
                    <img src="/profile-image.png" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  {/* Decorative dots */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-accent rounded-full"></div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
                  </motion.div>
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <div className="glass-card p-6 rounded-xl shadow-sm">
                  <p className="text-lg text-gray-300 mb-4">
                    Comp-Sci student at BRAC University with a passion for development, content creation, tech and
                    marketing.
                  </p>
                  <p className="text-lg text-gray-300 mb-4">
                    Skilled in Front End Development, Photography/Videography, Video Editing, and Graphic Design, I
                    excel in collaborating with teams, solving problems, and delivering impactful results. Committed to
                    growth, I aim to contribute effectively while continuously learning.
                  </p>
                  <p className="text-lg text-gray-300">
                    When I'm not coding or designing, you can find me exploring new technologies, learning about
                    geography and outer space, and delving into movies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section
        id="projects"
        className="min-h-screen flex items-center justify-center snap-start p-4 bg-background-dark"
      >
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              <ProjectCard
                title="Project One"
                description="A responsive web application with modern UI/UX design principles and interactive elements."
                imageUrl="/placeholder.svg?height=600&width=600"
                projectUrl="https://example.com/project1"
              />
              <ProjectCard
                title="Project Two"
                description="An e-commerce platform with dynamic product filtering and cart functionality."
                imageUrl="/placeholder.svg?height=600&width=600"
                projectUrl="https://example.com/project2"
              />
              <ProjectCard
                title="Project Three"
                description="A dashboard interface with data visualization and real-time updates."
                imageUrl="/placeholder.svg?height=600&width=600"
                projectUrl="https://example.com/project3"
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section id="skills" className="h-screen flex items-center justify-center snap-start bg-background-darker p-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <SkillCard title="Frontend Development" items={["React", "Next.js", "Vue", "HTML/CSS"]} />
              <SkillCard title="UI/UX Design" items={["Figma", "Adobe XD", "Responsive Design", "Accessibility"]} />
              <SkillCard title="Backend" items={["Node.js", "Express", "MongoDB", "Firebase"]} />
              <SkillCard title="Languages" items={["JavaScript", "TypeScript", "Python", "SQL"]} />
              <SkillCard title="Tools" items={["Git", "Webpack", "Jest", "CI/CD"]} />
              <SkillCard title="Other" items={["SEO", "Performance Optimization", "PWA", "WebSockets"]} />
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section id="contact" className="h-screen flex items-center justify-center snap-start p-4 bg-background-dark">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">Get In Touch</h2>
            <div className="glass-card p-6 rounded-xl shadow-sm">
              <p className="text-lg text-gray-300 mb-6 text-center">
                Interested in working together? Feel free to reach out through any of the platforms below.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton icon={<Mail />} text="your@email.com" href="mailto:your@email.com" />
                <ContactButton icon={<Github />} text="GitHub" href="https://github.com" />
                <ContactButton icon={<Linkedin />} text="LinkedIn" href="https://linkedin.com" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  )
}

function NavItem({ id, active, icon }: { id: string; active: boolean; icon: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      className={`p-2 rounded-full transition-colors ${
        active ? "bg-accent text-white" : "text-gray-400 hover:text-accent"
      }`}
    >
      {icon}
      <span className="sr-only">{id}</span>
    </a>
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

function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
}: {
  title: string
  description: string
  imageUrl: string
  projectUrl: string
}) {
  return (
    <div className="rounded-xl overflow-hidden transform-gpu">
      <motion.a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full aspect-square relative rounded-xl overflow-hidden group perspective"
        whileHover={{
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          z: 50,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-xl"></div>
        </div>

        {/* Content Overlay - Only visible on hover */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 rounded-xl">
          <div className="glass-card backdrop-blur-md bg-black/30 p-6 rounded-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-accent">{title}</h3>
            <p className="text-white text-sm md:text-base">{description}</p>
            <div className="mt-4 flex items-center">
              <span className="text-accent flex items-center gap-1">
                View Project <ExternalLink size={16} />
              </span>
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  )
}

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-card p-5 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-accent">{title}</h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-gray-300">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactButton({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode
  text: string
  href: string
}) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-accent hover:text-white rounded-full transition-colors"
    >
      {icon}
      <span>{text}</span>
    </motion.a>
  )
}
