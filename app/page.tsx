"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Briefcase, Code, ExternalLink, Github, Linkedin, Mail, User, Folder } from "lucide-react"
import ThemeCustomizer from "@/components/theme-customizer"
import TypewriterName from "@/components/typewriter-name"

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
    } else if (scrollPosition < windowHeight * 4.5) {
      setActiveSection("experience")
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
          <NavItem id="experience" active={activeSection === "experience"} icon={<Briefcase size={18} />} />
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
                    When I'm not coding or designing, you can find me exploring new technologies, learning about geography and outer space, and delving into the world of anime and movies.
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

      <section id="experience" className="h-screen snap-start bg-background-dark relative overflow-hidden">
        {/* Fixed header with fading effect */}
        <div className="sticky top-0 pt-20 pb-6 z-30 bg-background-dark">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">Work Experience</h2>
          {/* Top fade gradient */}
          <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-transparent to-background-dark"></div>
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute left-0 right-0 bottom-0 h-8 z-20 bg-gradient-to-b from-transparent to-background-dark"></div>

        {/* Experience cards container */}
        <div className="h-full pt-4 pb-40 overflow-auto hide-scrollbar">
          <div className="max-w-3xl mx-auto px-4 flex flex-col gap-6">
            <ExperienceCard
              title="Chief Marketing Officer"
              company="Relevent Bangladesh"
              period="2024-Present"
              logoUrl="/logos/relevent.png"
              details={[
                "Led marketing, content creation, and promotional campaigns; successfully organized concert named 'Dhaka Vibes' featuring country's top bands like Karnival, Level Five, and Kaaktaal.",
                "Directed teams for content production, sound, and lighting, managed band coordination, ads, and promotional video shoots, ensured seamless execution.",
                "Co-manager, lead editor at Barta Bangladesh, an online news platform by Relevent, covering domestic and international news, overseeing design and editorial efforts for consistent, impactful content.",
              ]}
            />

            <ExperienceCard
              title="Short Form Content Creator"
              company="Kabeer. Studios"
              period="2024-Present"
              logoUrl="/logos/kabeer-studios.png"
              details={[
                "Produced vertical and short-form content for YouTube and social media platforms to support promotional campaigns and drive audience engagement.",
                "Collaborated with international brands like Label Leverage and Yoyoso Bangladesh. Created visually appealing, high-impact content tailored to brand identity and marketing goals.",
              ]}
            />

            <ExperienceCard
              title="Digital Marketing Senior Manager"
              company="IABC Brac University"
              period="2023-Present"
              logoUrl="/logos/iabc.png"
              details={[
                "Oversaw digital marketing efforts, developed scripts, arranged shoots, filmed, and edited short-form content, including promotional videos, recruitment campaigns, and event teasers.",
                "Developed impactful social media content to enhance brand visibility and engagement. Actively collaborated with the community to support and expand digital marketing efforts.",
              ]}
            />

            <ExperienceCard
              title="Lead Content Creator"
              company="EzGadgets"
              period="2023-2025"
              logoUrl="/logos/ez-gadgets.png"
              details={[
                "Created engaging short form/long form content and innovative marketing strategies to drive business growth.",
                "Designed promotional materials/ads and social media static posts, ensured quality through active communication with both audiences and managers.",
                "Shot, edited, and narrated several first-impression and hands-on videos for gaming peripherals.",
              ]}
            />

            <ExperienceCard
              title="Content Creator"
              company="Blisstyle Electronics"
              period="2024-2025"
              logoUrl="/logos/blisstyle.png"
              details={[
                "Created and edited engaging social media content for sales and offers, increasing the brand's online visibility.",
                "Designed web covers and visuals that enhanced the site's overall aesthetics. Produced YouTube videos and high-performing thumbnails that boosted click-through rates.",
                "Actively engaged with the online community to foster brand interaction and topic-driven discussions.",
              ]}
            />

            <ExperienceCard
              title="Content Organizer"
              company="Visuals and Cinematic Universe (VCU) - Cultural Classicists"
              period="2023-Present"
              logoUrl="/logos/vcu.png"
              details={[
                "Led teams in planning and executing university events, ensuring seamless coordination and effective management of team members.",
                "Demonstrated strong leadership, problem-solving, and decision-making skills while maintaining clear and professional communication with stakeholders, teams, and audiences.",
                "Contributed to a dynamic community of digital content creators, helping drive engagement and collaboration.",
                "Helped organize and manage online events, strengthening community connections and encouraging creativity.",
              ]}
            />

            <ExperienceCard
              title="Private Tutor"
              company="Tuition Terminal"
              period="2021-2023"
              logoUrl="/logos/tuition-terminal.png"
              details={[
                "Provided one-on-one academic support to students ranging from elementary to high school levels. Taught a variety of subjects including Science, English, Mathematics, Social Studies, and Geography.",
                "Customized lesson plans to match each student's learning pace and needs. Helped improve academic performance and built strong foundational understanding across multiple disciplines.",
              ]}
            />

            <ExperienceCard
              title="Co-founder, Content Creator"
              company="Septem Exierant"
              period="2020-2022"
              logoUrl="/logos/septem-exierant.png"
              details={[
                "Former Co-founder, Content Creator, and Video Editor at one of country's leading esports club. Created engaging YouTube and social media content and actively engaged in organizing online esports tournaments, increasing community involvement.",
                "Live-streamed gameplay and contributed to player recruitment efforts. Acted as the team leader and led the team to victory in a nationwide Valorant tournament, demonstrating leadership and decision-making skills.",
              ]}
            />

            <ExperienceCard
              title="Junior Representative"
              company="DRMC IT CLUB"
              period="2019-2020"
              logoUrl="/logos/ditc.png"
              details={[
                "Volunteered in the gaming sector at Dhaka Residential Model College IT Club, organized and managed a nationwide gaming event.",
                "Utilized strong communication and crowd control skills to maintain order and foster a positive environment, effectively engaging attendees and addressing any concerns during the event.",
                "Contributed to the event's photography, capturing key moments and highlights to showcase the event's success.",
                "Managed various projects, ensuring deadlines were met and tasks were effectively coordinated while helping control the flow of people and activities to keep the event on track.",
              ]}
            />

            <ExperienceCard
              title="Class Representative"
              company="New Horizons CLC Bangladesh"
              period="2019"
              logoUrl="/logos/new-horizons.png"
              details={[
                "Served as the main contact between students and faculty, effectively communicating concerns and feedback.",
                "Organized discussions for input and represented classmates in meetings.",
                "This role, alongside my programming studies in C++ and earning a certificate, enhanced my leadership and communication skills while fostering a positive learning environment.",
              ]}
            />
            <div className="h-16"></div>
          </div>
        </div>
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

function ExperienceCard({
  title,
  company,
  period,
  logoUrl,
  details,
}: {
  title: string
  company: string
  period: string
  logoUrl: string
  details: string[]
}) {
  // Fade in animation for cards
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="transform-gpu perspective h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 30,
      }}
      transition={{
        duration: 0.5,
        delay: Math.random() * 0.3, // Random delay for staggered effect
      }}
      whileHover={{
        scale: 1.02,
        z: 10,
      }}
    >
      <div className="glass-card rounded-xl overflow-hidden shadow-lg relative h-full flex flex-col">
        <div className="p-5">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-4 mb-4">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16">
                {/* Single rotating border */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-accent"
                  style={{
                    borderWidth: "2px",
                    filter: "drop-shadow(0 0 2px var(--color-accent))",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                ></motion.div>

                {/* Logo container - square with rounded corners */}
                <div className="absolute inset-[3px] rounded-lg overflow-hidden border border-accent/30 bg-background-darker backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-background-dark/80 to-transparent mix-blend-overlay"></div>
                  <img
                    src={logoUrl || "/placeholder.svg"}
                    alt={`${company} logo`}
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-accent truncate">{title}</h3>
              <h4 className="text-base text-white truncate">{company}</h4>
              <span className="text-gray-400 text-sm">{period}</span>
            </div>
          </div>

          {/* Details Section - Always visible */}
          <div className="space-y-2 mt-3">
            {details.map((detail, index) => (
              <p key={index} className="text-gray-300 text-sm">
                {detail}
              </p>
            ))}
          </div>
        </div>

        {/* 3D effect elements */}
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

          {/* Left highlight */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent"></div>

          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-black/50"></div>

          {/* Right shadow */}
          <div className="absolute top-0 bottom-0 right-0 w-px bg-black/50"></div>
        </div>
      </div>
    </motion.div>
  )
}
