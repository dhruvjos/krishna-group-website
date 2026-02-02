import {
  Languages,
  Users,
  Briefcase,
  Building,
  Calculator,
  Globe,
  Shield,
  BrainCircuit,
  Sparkles,
  Award,
  LucideProps,
  BookOpen,
  Bot,
  Sigma,
  TestTube,
  FileCode,
  PenTool,
  GraduationCap,
  Sprout,
  HeartHandshake
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface Course {
  name: string;
  slug: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | ((props: LucideProps) => JSX.Element);
  description: string;
  details?: CourseDetails;
}

export interface CourseDetails {
  title: string;
  duration?: string;
  price?: string;
  description: string;
  features: string[];
  note?: string;
}

const FourSMeditationIcon = (props: LucideProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
      <path d="M12 4s-4 4-4 4" />
      <path d="M12 4s4 4 4 4" />
      <path d="M20 12s-4-4-4-4" />
      <path d="M4 12s4-4 4-4" />
    </svg>
  );
};


export const allCourses: Course[] = [
  {
    name: "English Speaking",
    slug: "english-speaking",
    icon: Languages,
    description: "Master fluent English communication.",
    details: {
      title: "Success Foundation: English Practice & Personality",
      duration: "90 hrs",
      price: "₹8,700",
      description: "A foundational course designed to build strong grammar and practice for fluent English communication.",
      features: [
        "Comprehensive Grammar",
        "Practical Conversation Exercises",
        "Vocabulary Building",
        "Basic Personality Grooming"
      ]
    }
  },
  {
    name: "Leadership",
    slug: "leadership",
    icon: Users,
    description: "Develop skills to lead and inspire teams.",
    details: {
      title: "Leadership Development Program",
      description: "A specialized program focused on nurturing leadership qualities for personal and professional growth.",
      features: [
        "Taking Initiatives",
        "Positive Approach",
        "Time Management",
        "Discipline",
        "Problem Solving",
        "Confidence Building"
      ]
    }
  },
  {
    name: "Interview Prep",
    slug: "interview-prep",
    icon: Briefcase,
    description: "Ace your next job interview with confidence.",
     details: {
      title: "Strategic Interviewing",
      description: "Master the art of interviewing, from preparation to follow-up, to land your dream job.",
      features: [
        "Resume Building",
        "Mock Interviews with Feedback",
        "Group Discussion Techniques",
        "Debating Skills",
        "Body Language & Etiquette"
      ]
    }
  },
  {
    name: "Corporate Skills",
    slug: "corporate-skills",
    icon: Building,
    description: "Enhance your professional etiquette and skills.",
    details: {
      title: "Success Tower: English Communication & Personality Enhancement",
      duration: "45 hrs",
      price: "₹7,500",
      description: "A comprehensive program covering a wide array of skills essential for corporate success.",
      features: [
        "Fluency in English", "Interview Preparation", "Group discussion", "Debating", "Communication Skill", "Taking Initiatives", "Positive Approach", "Time Management", "Discipline", "Problem solving", "Leadership", "Case studies", "Confidence Building", "Life Acceptance", "Reading, Writing, Listening & speaking skills", "Campus Master", "Video Shooting", "Intro of Kaizen & five 'S'", "Mind Mapping", "Social Media Usage and much more..."
      ],
      note: "Success Tower Needs your Testing. Duration depends on grasping power."
    }
  },
  {
    name: "Aarya Maths",
    slug: "aarya-maths",
    icon: Calculator,
    description: "Unlock advanced mathematical problem-solving.",
    details: {
        title: "Arya Maths Academy",
        description: "Specialized coaching to build a strong foundation in mathematics and excel in competitive exams.",
        features: [
            "Speed Maths: Multiple Calculations just in a minute (Useful for Bank, MPSC, UPSC CET, CAT, MAT, etc)",
            "Special foundation courses from 8th Std",
            "Coming out of Maths Phobia",
            "Competitive Maths preparations with basics",
            "For 7th & to 10th all boards",
            "Maths for diploma engineering",
            "Preparation of 11th & 12th Maths",
            "NTSE & MISE preparation"
        ],
        note: "Individual attention for all students"
    }
  },
  {
    name: "Robotics & Tech",
    slug: "robotics-tech",
    icon: Bot,
    description: "STEAM-based Robotics, Automation and Programming.",
    details: {
        title: "Krishna Roboinfo Tech & Science Academy",
        description: "Authorized by Unitek Robotron [Korea] & 13 Media Tech PVT. LTD [Pune], this course offers hands-on experience in modern technology.",
        features: [
            "STEAM based Robotics & Automation Education",
            "Robotics Education for kids & engineering students",
            "Hands on Robotics design workshop (Ⅰ&Ⅱ) courses",
            "Engineering Electronics",
            "Logical Test & Programming skill development",
            "Website Development, Business Accounting Management, Tally ERP-9",
            "C & C++ Programming, Software Development, MS-office, DTP",
            "STEM education",
            "Enquiry based learning",
            "Logic Development",
            "C, C++, Java, Python, Sanganak Suwidha"
        ]
    }
  },
  {
    name: "Memory Management",
    slug: "memory-management",
    icon: BrainCircuit,
    description: "Techniques to improve your memory.",
    details: {
        title: "Institute of Memory Management & Applications",
        price: "₹2,000",
        description: "Unlock the power of your mind with proven techniques for memory enhancement and concentration.",
        features: [
            "Concentration Formula \"DEEP\": Dynamic Entertaining & Easiest Programme",
            "Audio-Visual Memory",
            "Study Skills",
            "Silva Mind Control",
            "Strategic Interviewing",
            "Spider Notes",
            "Textual & Numerical Memory",
            "Photographic Memory",
            "Mind Mapping",
            "Quality Management",
            "Meditation for better Concentration",
            "Exclusive Technique to remember 500 years calender"
        ]
    }
  },
  {
    name: "Personality Development",
    slug: "personality-development",
    icon: Sparkles,
    description: "Shape your personality for success.",
     details: {
      title: "Comprehensive Personality Development",
      description: "A holistic program to build confidence, enhance communication, and cultivate a positive and impactful personality.",
      features: [
        "Confidence Building",
        "Public Speaking",
        "Body Language & Grooming",
        "Positive Mindset Development",
        "Social Etiquette"
      ]
    }
  },
  { 
    name: "IELTS/TOEFL", 
    slug: "ielts-toefl", 
    icon: Award, 
    description: "Prepare for International English tests.",
    details: {
        title: "IELTS & TOEFL Training Centre",
        price: "₹7,000",
        description: "Training for International English Language Testing System [IELTS] and Test of English as a Foreign Language [TOEFL].",
        features: [
            "Focused individual test preparation",
            "Improving reading skills",
            "Improving writing skills",
            "Improving listening skills",
            "Improving speaking skills"
        ]
    }
  },
  {
    name: "Voice Modulation",
    slug: "voice-modulation",
    icon: BookOpen,
    description: "Refine your tone, accent, and pronunciation.",
    details: {
        title: "Success Booster - Rhythmic English",
        price: "₹4,500",
        description: "Enhance your spoken English with a focus on rhythm, pronunciation, and accent.",
        features: [
            "Pronunciation Practice",
            "Neutral Accent Training",
            "Voice Modulation Techniques"
        ]
    }
  },
  {
    name: "4s Meditation",
    slug: "4s-meditation",
    icon: FourSMeditationIcon,
    description: "Find inner peace and focus through meditation.",
     details: {
      title: "Shrikrishna Life Transformation Centre",
      description: "A center dedicated to bringing liveliness and peace into one's life through meditation and service.",
      features: [
        "4s Meditation",
        "Leadership Development Centre",
        "Sera Sadhana",
        "Chatting on full moon-light",
        "A service towards Gau Mata",
        "A day Care [calling the moments back which are left without living]"
      ]
    }
  },
   {
    name: "Science Academy",
    slug: "science-academy",
    icon: TestTube,
    description: "Foundation courses for science and competitive exams.",
     details: {
        title: "Shri Krishna Science Academy",
        description: "Offering foundational and advanced courses for school students aiming for competitive exams like CET, NEET, and JEE.",
        features: [
            "Foundation Courses Std 6 to 10 (₹6,000/subject): Understand Concepts, Learn with easy examples, Experimental exposure, Regular Tests.",
            "Std 11 & 12th CET/NEET/JEE: Revision of Previous Classes, Conceptual learning, Weekly Test, Numerical Practise.",
            "NEET: ₹35,000 / subject",
            "11th & 12th CET: ₹15,000 / per year/ subject"
        ]
    }
  },
  {
    name: "Kids Programs",
    slug: "kids-programs",
    icon: Sprout,
    description: "English and personality improvement for kids.",
    details: {
      title: "Online English Improvement for Kids",
      price: "₹7,000",
      description: "Nurturing young minds with courses on public speaking, personality improvement, and comprehensive English grammar.",
      features: [
          "English speaking Course for Kids",
          "Nurturing Quotients - Public speaking & personality improvements for kids",
          "Comprehensive English Grammar for kids",
          "Comp - Chap [Foundation Classes from 5th Std]"
      ]
    }
  },
  {
    name: "Shrikrishna NGO",
    slug: "shrikrishna-ngo",
    icon: HeartHandshake,
    description: "An NGO with a vision to bring liveliness to the deprived.",
    details: {
      title: "Shrikrishna Life Transformation Centre - NGO",
      description: "An NGO with the vision to bring liveliness in the life of the \"deprived ones\". We are trying to assist the needy in the monetary form or sharing information through counselling. We would like to connect people of 'haves not' category with 'haves'.",
      features: []
    }
  }
];

export const courseCategories = [
    { name: "Professional Development", courses: ["Leadership", "Interview Prep", "Corporate Skills", "Voice Modulation"] },
    { name: "Language & Communication", courses: ["English Speaking", "IELTS/TOEFL"] },
    { name: "Cognitive & Personal Growth", courses: ["Aarya Maths", "Memory Management", "Personality Development", "4s Meditation"] },
    { name: "Tech & Science", courses: ["Robotics & Tech", "Science Academy"]},
    { name: "Youth Programs", courses: ["Kids Programs", "Shrikrishna NGO"]}
];
