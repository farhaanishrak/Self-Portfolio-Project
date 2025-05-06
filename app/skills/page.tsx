"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Film, Camera, Palette, Code, Cpu, Lightbulb, Users, Brain, Clock, Globe, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background-dark">
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

      {/* Skills header */}
      <div className="relative z-30 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center relative z-10 text-white"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Skills & Expertise
        </motion.h2>
      </div>

      {/* Skills content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Design & Media Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-5 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Film className="mr-2 text-accent" /> Video Production
              </h3>

              <div className="space-y-6">
                <SkillBar
                  name="Adobe Premiere Pro"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/premiere-pro-ZurUr2r1VyvIrkC84lyRn5iqjpOqLs.png"
                  rating={4.5}
                  color="#E55050"
                />
                <SkillBar
                  name="Adobe After Effects"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/after-effects-2snBqSpx5wleeMkKz5b6a0cjCmXSwp.png"
                  rating={3.5}
                  color="#4ED7F1"
                />
                <SkillBar
                  name="Videography"
                  icon={<Camera className="w-6 h-6 text-white" />}
                  rating={5}
                  color="#F3F3E0"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-5 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Palette className="mr-2 text-accent" /> Design
              </h3>

              <div className="space-y-6">
                <SkillBar
                  name="Adobe Illustrator"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/illustrator-75FRguwpMrsAUMz38RCcfXubfJBerW.png"
                  rating={3}
                  color="#FF9F00"
                />
                <SkillBar
                  name="Adobe Lightroom"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photoshop-lightroom-K8tsCGV58xZilIY6Hgkam0HomzOHJe.png"
                  rating={5}
                  color="#FBDB93"
                />
                <SkillBar
                  name="Photography"
                  icon={<Camera className="w-6 h-6 text-white" />}
                  rating={5}
                  color="#A4B465"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-5 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Globe className="mr-2 text-accent" /> Languages
              </h3>

              <div className="space-y-6">
                <SkillBar
                  name="Bangla (Native)"
                  icon={<MessageCircle className="w-6 h-6 text-white" />}
                  rating={5}
                  color="#EDEEEA"
                />
                <SkillBar
                  name="English"
                  icon={<MessageCircle className="w-6 h-6 text-white" />}
                  rating={5}
                  color="#C5172E"
                />
                <SkillBar
                  name="Hindi"
                  icon={<MessageCircle className="w-6 h-6 text-white" />}
                  rating={4}
                  color="#FAD59A"
                />
              </div>
            </motion.div>
          </div>

          {/* Programming & Soft Skills Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-5 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Code className="mr-2 text-accent" /> Web Development
              </h3>

              <div className="space-y-6">
                <SkillBar
                  name="HTML & CSS"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html-5-F4QWb3JKftfmnGZ0HL9uGEJyKToRXw.png"
                  rating={4}
                  color="#E34F26"
                />
                <SkillBar
                  name="React"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/science-49j6fejrfeOKQylyQbMqdOVTUvxPFd.png"
                  rating={3.5}
                  color="#61DAFB"
                />
                <SkillBar
                  name="JavaScript"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/js-5cr3oOtlmgje2tlX6fRjauQl1gXAo1.png"
                  rating={3}
                  color="#F7DF1E"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-5 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Cpu className="mr-2 text-accent" /> Programming
              </h3>

              <div className="space-y-6">
                <SkillBar
                  name="Python"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/python-8z2pLBfmD54IxncACKnLRDT26l0lxi.png"
                  rating={4}
                  color="#FFA55D"
                />
                <SkillBar
                  name="MySQL Database"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mysql-8LEUQcDV0uJyrryXRngwPssmgAzNsy.png"
                  rating={3}
                  color="#4479A1"
                />
                <SkillBar
                  name="PHP"
                  icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-V6LfNjNOkZLElSimq9HY31T7YUBmK6.png"
                  rating={2.5}
                  color="#F7CFD8"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card p-5 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Lightbulb className="mr-2 text-accent" /> Soft Skills
              </h3>

              <div className="space-y-6">
                <SkillBar
                  name="Community Engagement"
                  icon={<Users className="w-6 h-6 text-white" />}
                  rating={4}
                  color="#FF6D00"
                />
                <SkillBar
                  name="Critical Thinking"
                  icon={<Brain className="w-6 h-6 text-white" />}
                  rating={5}
                  color="#2979FF"
                />
                <SkillBar
                  name="Time Management"
                  icon={<Clock className="w-6 h-6 text-white" />}
                  rating={4}
                  color="#00BFA5"
                />
                <SkillBar
                  name="Teamwork & Adaptability"
                  icon={<Users className="w-6 h-6 text-white" />}
                  rating={4.5}
                  color="#BBD8A3"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quote */}
        <motion.div
          className="text-center mt-16 italic text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          "Creativity is intelligence having fun." — Albert Einstein
        </motion.div>
      </div>
    </div>
  )
}

function SkillBar({
  name,
  icon,
  rating,
  color,
}: {
  name: string
  icon: React.ReactNode | string
  rating: number
  color: string
}) {
  const percentage = (rating / 5) * 100

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center flex-shrink-0">
          {typeof icon === "string" ? (
            <Image src={icon || "/placeholder.svg"} alt={name} width={20} height={20} />
          ) : (
            icon
          )}
        </div>

        {/* Skill name */}
        <h4 className="text-sm font-medium text-white">{name}</h4>
      </div>

      {/* Horizontal progress bar */}
      <div className="h-2 bg-black/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}
