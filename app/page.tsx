"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  ArrowDown,
  Briefcase,
  Code,
  Github,
  Linkedin,
  Mail,
  User,
  Folder,
  Camera,
  Film,
  Palette,
  PenTool,
  Presentation,
  Database,
  Brain,
  Clock,
  Users,
  Sparkles,
  Cpu,
  FileCode,
  Layout,
  Server,
  Layers,
  Aperture,
  Zap,
  Lightbulb,
  Download,
  Rocket,
  Globe,
  Monitor,
  Music,
} from "lucide-react"
import TypewriterName from "@/components/typewriter-name"
import SkillRating from "@/components/skill-rating"
import ContactChatbot from "@/components/contact-chatbot"

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
      setActiveSection("skills")
    } else if (scrollPosition < windowHeight * 3.5) {
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
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full shadow-md">
          <NavItem id="home" active={activeSection === "home"} icon={<User size={18} />} />
          <NavItem id="about" active={activeSection === "about"} icon={<User size={18} />} />
          <NavItem id="skills" active={activeSection === "skills"} icon={<Sparkles size={18} />} />
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
            <SocialButton icon={<Github />} href="https://github.com/farhaanishrak" />
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

      <section id="about" className="h-screen snap-start bg-background-dark relative overflow-hidden">
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

              {/* Resume download button */}
              <motion.a
                href="/CV_7.1.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 mt-6 bg-black/50 text-white rounded-full shadow-lg hover:shadow-accent/20 border border-accent/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <Download size={16} />
                <span className="text-sm">Download Resume</span>
              </motion.a>
            </motion.div>

            {/* About content - 7 columns on desktop */}
            <div className="md:col-span-7 space-y-4">
              {/* Bio cards */}
              <AboutCard icon={<User className="text-accent" size={24} />} title="Who I Am" delay={0.3}>
                <p className="text-gray-300">
                  Comp-Sci student at BRAC University with a passion for development, content creation, tech and
                  marketing.
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

      <section id="skills" className="min-h-screen snap-start bg-background-dark relative overflow-hidden">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-accent/20"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.2, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Sticky header with gradient */}
        <div className="sticky top-0 z-30 pt-20 pb-6">
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark to-transparent"></div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center relative z-10 text-white"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>
        </div>

        {/* Skills content */}
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Design & Media Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Film className="mr-2 text-accent" /> Video Production
                </h3>

                <div className="space-y-4">
                  <SkillItem name="Adobe Premiere Pro" icon={<Film />} rating={4.5} />
                  <SkillItem name="Adobe After Effects" icon={<Zap />} rating={3} />
                  <SkillItem name="Videography" icon={<Camera />} rating={5} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Palette className="mr-2 text-accent" /> Design
                </h3>

                <div className="space-y-4">
                  <SkillItem name="Adobe Photoshop" icon={<Layers />} rating={4.5} />
                  <SkillItem name="Adobe Lightroom" icon={<Aperture />} rating={4.5} />
                  <SkillItem name="Canva" icon={<PenTool />} rating={5} />
                  <SkillItem name="Photography" icon={<Camera />} rating={5} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Presentation className="mr-2 text-accent" /> Presentation
                </h3>

                <div className="space-y-4">
                  <SkillItem name="Microsoft PowerPoint" icon={<Presentation />} rating={4.5} />
                  <SkillItem name="Google Slides" icon={<Presentation />} rating={4.5} />
                </div>
              </motion.div>
            </div>

            {/* Programming & Soft Skills Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Code className="mr-2 text-accent" /> Web Development
                </h3>

                <div className="space-y-4">
                  <SkillItem name="HTML & CSS" icon={<Layout />} rating={4} />
                  <SkillItem name="React" icon={<Code />} rating={3.5} />
                  <SkillItem name="MERN Stack" icon={<Server />} rating={3} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Cpu className="mr-2 text-accent" /> Programming
                </h3>

                <div className="space-y-4">
                  <SkillItem name="Python" icon={<FileCode />} rating={4} />
                  <SkillItem name="MySQL Database" icon={<Database />} rating={3} />
                  <SkillItem name="PHP" icon={<FileCode />} rating={2.5} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <Lightbulb className="mr-2 text-accent" /> Soft Skills
                </h3>

                <div className="space-y-4">
                  <SkillItem name="Community Engagement" icon={<Users />} rating={4} />
                  <SkillItem name="Critical Thinking" icon={<Brain />} rating={5} />
                  <SkillItem name="Time Management" icon={<Clock />} rating={4} />
                  <SkillItem name="Teamwork & Adaptability" icon={<Users />} rating={4.5} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Artistic element - Connecting lines */}
          <div className="relative mt-12 h-20 hidden md:block">
            <motion.div
              className="absolute left-1/4 right-1/4 top-1/2 h-0.5 bg-accent/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-accent/30"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Quote */}
          <motion.div
            className="text-center mt-8 italic text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
          >
            "Creativity is intelligence having fun." — Albert Einstein
          </motion.div>
        </div>
      </section>

      <section id="experience" className="h-screen snap-start bg-background-dark relative overflow-hidden">
        {/* Fixed header with fading effect */}
        <div className="sticky top-0 pt-20 pb-6 z-30">
          <div className="relative z-30">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white">Work Experience</h2>
          </div>
          {/* Top fade gradient */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-background-dark/90 via-background-dark/70 to-transparent"></div>
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
                I'm always open to new opportunities — feel free to reach out!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton
                  icon={<Mail />}
                  text="farhanishrak12528@gmail.com"
                  href="mailto:farhanishrak12528@gmail.com"
                />
                <ContactButton icon={<Github />} text="GitHub" href="https://github.com/farhaanishrak" />
                <ContactButton icon={<Linkedin />} text="LinkedIn" href="https://linkedin.com/in/farhaanishrak" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
      <ContactChatbot />
    </main>
  )
}

function NavItem({ id, active, icon }: { id: string; active: boolean; icon: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      className={`p-2 rounde  icon: React.ReactNode }) {
  return (
    <a
      href={\`#${id}`}
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

function SkillItem({
  name,
  icon,
  rating,
}: {
  name: string
  icon: React.ReactNode
  rating: number
}) {
  return (
    <motion.div
      className="flex items-center justify-between"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 text-accent mr-3">
          {icon}
        </span>
        <span className="text-white">{name}</span>
      </div>
      <SkillRating rating={rating} />
    </motion.div>
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
                <div className="absolute inset-[3px] rounded-lg overflow-hidden border border-accent/30 bg-background-dark backdrop-blur-sm">
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

// New components for the enhanced About section
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
