import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  ArrowUpRight,
  Code,
  Layers,
  Database,
  Smartphone,
} from "lucide-react";
import { motion, useScroll } from "framer-motion";
// SocialLink Component
const SocialLink = ({
  href,
  icon: Icon,
  onMouseEnter,
  onMouseLeave,
  hoverBgClass,
  iconColor,
  hoverIconColor,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      className={`inline-flex items-center px-3 py-2 mt-2 mr-2 rounded-md text-white gap-1 bg-gray-800 ${hoverBgClass} transition-colors`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
    >
      <Icon color={isHovered ? hoverIconColor : iconColor} />
      {children}
    </a>
  );
};

// ProjectCard Component
const ProjectCard = ({ href, imageSrc, title, description, isEstifham }) => (
  <motion.a
    className="flex flex-col md:flex-row text-white rounded-2xl bg-gray-800/80 backdrop-blur-sm mt-2 p-6 gap-6 hover:bg-gray-700/90 transition-all duration-500 border border-gray-700/50 hover:border-gray-500 shadow-lg hover:shadow-xl group"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="my-auto flex justify-center md:justify-start">
      <img
        className={`${
          isEstifham ? "md:w-32 w-48" : "md:w-20 w-32"
        } object-contain transition-transform duration-500 group-hover:scale-110`}
        src={imageSrc}
        alt={title}
      />
    </div>
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </p>
        <div className="hidden md:block text-gray-400 group-hover:text-white transition-colors duration-500">
          <ArrowUpRight
            size={20}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
          />
        </div>
      </div>
      <p className="text-gray-300 mt-2 group-hover:text-white transition-colors duration-500">
        {description}
      </p>
      <div className="mt-4 text-sm text-blue-400 hidden group-hover:block transition-all duration-500">
        View project <ArrowUpRight className="inline ml-1" size={14} />
      </div>
    </div>
  </motion.a>
);

const PostCard = ({ href, title, date, content }) => (
  <motion.a
    className="flex flex-col text-white rounded-xl py-5 gap-3 hover:bg-gray-800/50 transition-all duration-300 px-5 border-b border-gray-700/30 group"
    href={href}
    rel="noopener noreferrer"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-4 md:items-center">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-2 h-2 rounded-full transition-all duration-300 group-hover:w-3 group-hover:h-3 flex-shrink-0"></div>
        <p className="font-medium group-hover:text-blue-400 transition-colors duration-300 text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300">
          {title}
        </p>
      </div>
      <p className="text-right text-xs my-auto text-gray-400 md:w-auto w-full flex-shrink-0 md:ml-2 pl-5 md:pl-0">
        {date}
      </p>
    </div>
    <div className="text-sm text-gray-400 pl-5 pr-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
      {content}
    </div>
    <div className="flex justify-end">
      <div className="text-blue-400 transition-all duration-300 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100">
        Read more{" "}
        <ArrowUpRight
          size={12}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
        />
      </div>
    </div>
  </motion.a>
);

const SkillCard = ({ icon: Icon, title, skills }) => (
  <motion.div
    className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="text-sm bg-gray-700/50 text-gray-200 px-3 py-1 rounded-full border border-gray-600"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

function App() {
  const socialLinksConfig = [
    {
      id: "github",
      href: "https://github.com/pagimos",
      Icon: Github,
      hoverBgClass: "hover:bg-gray-50 hover:text-black",
      iconColor: "#f0f0f0",
      hoverIconColor: "#000000",
      label: "Github",
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/pagimos/",
      Icon: Linkedin,
      hoverBgClass: "hover:bg-[#0077b5]",
      iconColor: "#0077b5",
      hoverIconColor: "#ffffff",
      label: "LinkedIn",
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/pagimos/",
      Icon: Instagram,
      hoverBgClass: "hover:bg-gradient-to-r from-[#fd5949] to-[#d6249f]",
      iconColor: "#d6249f",
      hoverIconColor: "#ffffff",
      label: "Instagram",
    },
    {
      id: "twitter",
      href: "https://twitter.com/pagimos",
      Icon: Twitter,
      hoverBgClass: "hover:bg-[#00ACEE]",
      iconColor: "#00ACEE",
      hoverIconColor: "#ffffff",
      label: "Twitter",
    },
  ];

  const projects = [
    {
      href: "https://estifham.vercel.app/",
      imageSrc: "../wlogo.svg",
      title: "Estifham",
      description:
        "An interactive trivia platform featuring over 200 questions across 20 diverse categories, allowing users to test their knowledge in various fields in a fun and engaging environment.",
    },
    {
      href: "https://www.stockivia.com",
      imageSrc: "../STOCKIVIA.png",
      title: "Stockivia",
      description:
        "An ambitious project set to revolutionize inventory and sales management in businesses, enhancing efficiency and integration.",
    },
    {
      href: "https://www.instagram.com/digital.bitwave",
      imageSrc: "../dbitwave.png",
      title: "Digital Bitwave",
      description:
        "An innovative firm providing website development, marketing, and design services to enhance digital presence for businesses.",
    },
    {
      href: "https://www.intelculator.com",
      imageSrc: "../intelculator.png",
      title: "Intelculator",
      description:
        "is an IQ calculator website that provides accurate IQ results through interactive intelligence tests, helping users assess their cognitive abilities.",
    },
  ];
  const posts = [
    {
      href: "#",
      title: "The Rise of AI-Powered Developer Tools: Boosting Productivity",
      date: "15-05-2024",
      content:
        "AI coding assistants are revolutionizing software development. These tools leverage machine learning to suggest code completions, debug issues, and even generate entire functions based on natural language descriptions...",
    },
    {
      href: "#",
      title: "Web3 Development: Building the Decentralized Future",
      date: "03-05-2024",
      content:
        "As Web3 technologies gain mainstream attention, developers are exploring new frameworks for creating decentralized applications. The integration of blockchain, smart contracts, and tokenomics is creating new possibilities...",
    },
    {
      href: "#",
      title: "The Evolution of Frontend Frameworks in 2024",
      date: "22-04-2024",
      content:
        "Modern frontend development continues to evolve with frameworks like React, Vue, and Svelte introducing more efficient rendering strategies. Server components and partial hydration techniques are changing how we think about web performance...",
    },
    {
      href: "#",
      title: "Implementing Microservices Architecture: Lessons Learned",
      date: "11-04-2024",
      content:
        "Breaking down monolithic applications into microservices offers scalability and maintainability advantages, but comes with its own challenges. Effective service discovery, API gateways, and containerization strategies are essential...",
    },
    {
      href: "#",
      title: "DevOps Automation: From CI/CD to GitOps",
      date: "03-04-2024",
      content:
        "Modern DevOps practices are becoming increasingly automated. GitOps extends CI/CD principles by using Git as the single source of truth for infrastructure declarations, enabling more consistent deployments and easier rollbacks...",
    },
  ];
  const { scrollYProgress } = useScroll();
  // Handlers for hover state are not needed for this simplified approach

  const skills = [
    {
      title: "Frontend",
      icon: Code,
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript",
        "HTML/CSS",
      ],
    },
    {
      title: "Backend",
      icon: Layers,
      skills: ["Node.js", "Express", "Python", "Django", "REST API", "GraphQL"],
    },
    {
      title: "Database",
      icon: Database,
      skills: [
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Firebase",
        "Redis",
        "Supabase",
      ],
    },
    {
      title: "Mobile & Other",
      icon: Smartphone,
      skills: ["React Native", "Git", "Docker", "AWS", "UX/UI Design"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-900 via-gray-950 to-black">
      <div className="px-6 md:py-[8vh] py-[2vh] max-w-[78ch] mx-auto xl:text-lg dark:prose-invert">
        <div className="text-white md:flex flex-row-reverse justify-around  gap-4 sm:gap-6 md:gap-10 mt-10 ">
          <motion.div
            className="m-auto w-48 md:w-96  "
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <img
              className="rounded-full border-2 border-white mb-8"
              src="../avatar.jpeg"
              alt=""
            />
          </motion.div>
          <div className="justify-center flex flex-col">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold my-2"
              initial={{ x: -2000 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              Hi, I'm Pagimos.
            </motion.div>
            <motion.div
              className="text-xl sm:text-xl md:text-2xl font-bold mb-2 text-[#ffb000]"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Full Stack Developer
            </motion.div>
            <div className="text-lg sm:text-xl md:text-xl w-full">
              As a Full Stack Developer, I love solving problems and creating
              user-friendly websites that make every interaction easy and
              enjoyable.
            </div>
            <div className="mt-6 ">
              {socialLinksConfig.map(
                ({
                  id,
                  href,
                  Icon,
                  hoverBgClass,
                  iconColor,
                  hoverIconColor,
                  label,
                }) => (
                  <SocialLink
                    key={id}
                    href={href}
                    icon={Icon}
                    hoverBgClass={hoverBgClass}
                    iconColor={iconColor}
                    hoverIconColor={hoverIconColor}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => {}}
                  >
                    {label}
                  </SocialLink>
                )
              )}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Skills & Technologies
              </p>
              <div className="h-1 w-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                icon={skill.icon}
                title={skill.title}
                skills={skill.skills}
              />
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col text-white mt-28 max-w-[76ch] mx-auto">
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Projects
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={24} />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-2">
            {projects.map(({ href, imageSrc, title, description }, index) => (
              <ProjectCard
                key={title}
                href={href}
                imageSrc={imageSrc}
                title={title}
                description={description}
                isEstifham={index === 0}
              />
            ))}
          </div>
        </div>

        <motion.div className="flex flex-col text-white mt-28 mx-auto">
          <motion.div
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Latest Posts
              </p>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={24} />
            </motion.div>
          </motion.div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg">
            {posts.map(({ href, title, date, content }, index) => (
              <PostCard
                key={index}
                href={href}
                title={title}
                date={date}
                content={content}
              />
            ))}
            <div className="p-4 text-center bg-gray-800/50">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors flex justify-center items-center gap-2"
              >
                View all posts <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <footer className="mt-20 border-t border-gray-800 py-8 text-white text-center">
        <div className="max-w-[78ch] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Pagimos
              </p>
              <p className="text-gray-400 text-sm mt-1">Full Stack Developer</p>
            </div>
            <div className="flex space-x-4">
              {socialLinksConfig.map(({ id, href, Icon, iconColor }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Icon size={18} color={iconColor} />
                </a>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Pagimos. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
