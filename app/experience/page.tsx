"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background-dark">
      {/* Fixed header with fading effect */}
      <div className="relative mb-12 z-30">
        <div className="relative z-30">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">Work Experience</h2>
        </div>
        {/* Top fade gradient */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background-dark/90 via-background-dark/70 to-transparent"></div>
      </div>

      {/* Experience cards container */}
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
      </div>
    </div>
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
