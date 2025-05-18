import { LuPencilLine, LuSearch } from "react-icons/lu";
import { HiLightningBolt } from "react-icons/hi";
import { FaFacebookF, FaHandHoldingMedical, FaLinkedinIn, FaList, FaReadme, FaSpeakap, FaUserPlus, FaUsers } from "react-icons/fa";
import { SiGoogleanalytics, SiTestcafe } from "react-icons/si";
import { LuTicket } from "react-icons/lu";
import { HiMiniBellAlert } from "react-icons/hi2";
import { PiSealQuestionFill } from "react-icons/pi";
import { MdAddCard, MdAddToPhotos, MdChat, MdCollectionsBookmark, MdEvent, MdEventNote, MdEventRepeat, MdHomeMax, MdKeyboardArrowDown, MdOutlineStickyNote2 } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { FaBookOpenReader, FaEarListen, FaFileCircleCheck, FaUserGear } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { TbHomeEdit } from "react-icons/tb";



export const Th = ({ children, width }) => {
  return (
    <th
      className={`px-[8px] lg:px-[16px] py-2 text-left font-medium `}
      style={{ width }}
    >
      {children}
    </th>
  );
};

export const Td = ({ children }) => {
  return (
    <td className="px-[8px] lg:px-[16px] py-2 font-[400] text-[14px]">
      {children}
    </td>
  );
};

export const navItems = [
  {
    id: 2,
    title: "About Us",
    path: "/introduction",
  },
  {
    id: 3,
    title: "Study Abroad",
    path: "/abroad",
  },
  {
    id: 4,
    title: "Test Preparation",
    path: "#",
    icon2: <MdKeyboardArrowDown />,
    dropdown: [
      { id: 10, title: "IELTS Preparation", path: "/test/ielts" },
      { id: 30, title: "PTE Preparation", path: "/test/pte" },
      { id: 40, title: "SAT Preparation", path: "/test/sat" },
    ],
  },
  {
    id: 5,
    title: "Services",
    path: "/services",
  },
  {
    id: 6,
    title: "Blogs/Events",
    icon2: <MdKeyboardArrowDown />,
    path: "#",
    dropdown: [
      { id: 18, title: "Blogs", path: "/blogs" },
      { id: 19, title: "Events", path: "/events" },

    ],
  },
  {
    id: 7,
    title: "Contact Us",
    path: "/contactus",
  },
];



export const cardDetails = [
  {
    id: 1,
    title: "Course Subjects",
    shape:"/assets/shape_1.svg",
    color:"text-emerald-500",
    summary:"Ea reprehenderit ex magna eiusmod commodo amet pariatur anim officia duis.",
    img: "https://img.freepik.com/premium-vector/background-with-collection-different-school-subjects-study_160450-67.jpg?w=2000",
    desc: "Ea reprehenderit ex magna eiusmod commodo. Amet pariatur anim officia duis laborum incididunt Labore duis veniam tempor nulla nulla eiusmod consequat anim dolor ea ullamco ea ea. Anim officia cillum ad labore Lorem irure. Pariatur aliquip fugiat irure minim do. Et id ullamco ullamco et eu velit elit cupidatat ad reprehenderit qui consequat ipsum eiusmod. Amet velit ea quis fugiat ipsum voluptate elit eu id. Ea ad fugiat dolore occaecat.",
    icon: <MdCollectionsBookmark />,
    icon_color:" text-[#86efac]",
  },
  {
    id: 2,
    title: "Scholarships",
    shape:"/assets/shape_2.svg",
    color:"text-orange-400",
    summary:"Mollit ex fugiat labore irure laborum. Proident et ullamco occaecat non ad.",
    img: "https://imageio.forbes.com/specials-images/imageserve/5fb2d344abf7d301612e2395/0x0.jpg?format=jpg&width=1200",
    desc: "Ea reprehenderit ex magna eiusmod commodo. Amet pariatur anim officia duis laborum incididunt Tempor est esse non anim aliquip ullamco excepteur occaecat. Mollit ex fugiat labore irure laborum. Proident et ullamco occaecat non ad amet nulla voluptate in. Cillum veniam aliquip magna mollit exercitation elit aliqua deserunt pariatur do fugiat aliquip duis. Incididunt tempor nisi Lorem pariatur consectetur. Deserunt consequat amet culpa aliquip laboris consectetur magna duis ea.",
    icon: <IoSchoolSharp />,
    icon_color:" text-[#fef08a]",

  },
  {
    id: 3,
    title: "Check your eligibility",
    shape:"/assets/shape_3.svg",
    color:"text-violet-500",
    summary:" Amet pariatur anim officia duis laborum incididunt Do laborum cillum ullamco.",
    img: "https://randduk.com/app/uploads/2023/10/Is-my-business-eligible-for-the-SME-RD-tax-relief-scheme-e1698254232811.jpg",
    desc: "Ea reprehenderit ex magna eiusmod commodo. Amet pariatur anim officia duis laborum incididunt Do laborum cillum ullamco eu cupidatat. Pariatur commodo ullamco amet enim sint excepteur sit est est excepteur. Aliqua aute irure culpa Lorem deserunt est elit pariatur in aliqua officia labore est in. In culpa labore commodo laborum labore aliqua dolore excepteur nisi id elit quis officia. Cupidatat ex pariatur cillum velit in Lorem nostrud nisi officia nisi eiusmod non. Nisi occaecat ut nostrud mollit Lorem.",
    icon: <HiLightningBolt />,
    icon_color:"text-[#f16a6a]",

  },
  {
    id: 4,
    title: "Support with Applications",
    shape:"/assets/shape_4.svg",
    color:"text-yellow-400",
    summary:"Voluptate deserunt mollit magna elit ea quis sint nostrud pariatur nostrud.",
    img: "https://hpaldc.org/RoofTopSolar/Help.jpg",
    desc: "Ea reprehenderit ex magna eiusmod commodo. Amet pariatur anim officia duis laborum incididunt Aute mollit dolor aliqua irure et reprehenderit occaecat. Voluptate deserunt mollit magna elit ea quis sint nostrud pariatur nostrud. Sunt occaecat laboris do tempor laboris labore quis occaecat est. Consectetur do tempor laborum proident ipsum tempor magna ex reprehenderit aliquip exercitation.",
    icon: <FaHandHoldingMedical />,
    icon_color:"text-[#8938d9]",

  },
  {
    id: 5,
    title: "Test Guidance",
    shape:"/assets/shape_5.svg",
    color:"text-green-500",
    summary:"Occaecat minim et ad ex voluptate reprehenderit nostrud do culpa id officia.",
    img: "https://wallpaperaccess.com/full/2020044.jpg",
    desc: "Ea reprehenderit ex magna eiusmod commodo. Amet pariatur anim officia duis laborum incididunt Consectetur exercitation cillum eu duis duis adipisicing. Laborum ex ut dolore occaecat voluptate ut deserunt incididunt laboris id tempor eiusmod ad. Cillum duis proident elit elit magna esse nisi nisi velit non in pariatur. Occaecat minim et ad ex voluptate reprehenderit nostrud do qui culpa id officia ea quis.",
    icon: <SiTestcafe />,
    icon_color:"text-[#93c5fd]",

  },
  {
    id: 6,
    title: "Events",
    shape:"/assets/shape_6.svg",
    color:"text-red-500",
    summary:"Labore non proident exercitation reprehenderit duis exercitation aliqua.",
    img: "https://img.freepik.com/free-vector/events-concept-illustration_114360-7733.jpg",
    desc: "Ea reprehenderit ex magna eiusmod commodo. Amet pariatur anim officia duis laborum incididunt Pariatur do do laboris nisi duis esse. Laborum aute nostrud do in ipsum cillum non tempor. Qui dolor velit Lorem consequat reprehenderit ipsum. Labore non proident exercitation reprehenderit duis exercitation aliqua id sunt. Est eu veniam amet nisi ut. Nostrud exercitation duis et adipisicing cupidatat duis do exercitation consectetur eu.",
    icon: <LuTicket />,
    icon_color:"text-[#fdba74]",

  },
];

export const aboutDesc = [
  {
    id: 10,
    title: "WHO WE ARE",
    description:
      "This Consultancy has a long standing reputation of being one of the most comprehensive study abroad consultants in Nepal. Our Corporate office is at Dillibazar, Kathmandu, Nepal. We have a support office in Sydney, Australia and branches at Dillibazar, Kathmandu, Narayanghat, Pokhara, Nawalparasi, Chitwan, Bhairahawa,Biratnagar, Damak, Butwal in Nepal.",
  },
  {
    id: 20,
    title: "OUR GOAL",
    description:
      "Tempor tempor ex consequat eu mollit sit dolore in magna. Excepteur Lorem nulla aute exercitation. Consectetur cillum nostrud do quis tempor aute ad in esse dolore magna dolore reprehenderit quis. Ut proident amet officia mollit Lorem. Pariatur Lorem dolor cupidatat dolore aliquip enim sunt duis. Dolore laboris sint esse nulla ipsum laboris laborum.",
  },
  {
    id: 30,
    title: "OUR CORE VALUES",
    description:
      "Aliqua pariatur fugiat laboris labore. Reprehenderit magna id qui non qui. Deserunt aute exercitation consectetur proident Lorem excepteur. Deserunt amet ipsum ex velit labore velit irure laborum.Minim ex ullamco excepteur consequat. Pariatur minim sint consequat consectetur cillum duis deserunt officia sint sit incididunt aute aute. Aute aliquip duis incididunt aute tempor in minim cupidatat deserunt mollit ex ipsum.",
  },
  {
    id: 40,
    title: "OUR OBJECTIVES",
    description:
      "Aliqua pariatur fugiat laboris labore. Reprehenderit magna id qui non qui. Deserunt aute exercitation consectetur proident Lorem excepteur. Deserunt amet ipsum ex velit labore velit irure laborum.",
  },
];

export const places = [
  {
    id: 1,
    name: "Australia",
    programs:"Dolore elit mollit minim reprehenderit labore id magna excepteur dolor est culpa quis. Fugiat sunt duis voluptate Lorem ullamco pariatur ullamco est fugiat eu labore. Aute aliqua do ipsum cupidatat.",
    keyFacts:[
      { 
        student_population:"1 million",
        currency:"Australian Dollar $",
        language:"English",
        universities:43,
      },
    ],
    flag:"/assets/flags/australia.png",
    banner:"/banners/australia.webp",
    img: "https://wallpapercave.com/wp/wp2209141.jpg",
    map: "https://static.vecteezy.com/system/resources/previews/022/541/457/original/australia-map-full-color-high-detail-separated-all-states-png.png",
    desc: "Uncover a world of opportunities in the land down under! With over 1,100 institutions, and 22,000 courses to choose from, Australia offers a world-class education and an outstanding quality of life.",
    requirement: [
      {
        ques: "Acceptance from a UK University",
        ans:
          "In order to be eligible, a UK academic institution must make a formal offer of acceptance. This can be verified with the issuance of a Confirmation of Acceptance for Studies (CAS) from the university in question.",
      },
      {
        ques: "English Language Proficiency",
        ans:
          "It is important to prove your capabilities in the English language. One way to do this is by taking a certified English exam such as TOEFL, IELTS, or PTE Academic. Before enrolling in any university, it is highly suggested to check their official webpage for the specific score required. This way, all requirements are fulfilled accordingly.",
      },
      {
        ques: "Financial Requirements",
        ans:
          "As part of the application process, it is essential to demonstrate that one has enough funds to pay for tuition and living costs while studying. This amount could depend on where and how long the course is, thus necessitating proof through bank statements or letters of financial sponsorship.",
      },
      {
        ques: "Visa Application",
        ans:
          "For students wishing to study in the United Kingdom and coming from Nepal or other specified nations, a Tier 4 (General) Student Visa is essential. Obtaining said visa usually requires a few steps, from submitting an online application form to providing evidence that one has both financial stability and English language proficiency, as well as the necessary documents such as a valid passport, a CAS reference number from their university of choice, TB test results (where applicable), passport-size photographs, and the visa fee. Depending on the UK embassies or consulate's wishes, additional paperwork may be requested.",
      },
    ],

    university: [
      {
        name: "Cardiff Metropolitan Uinversity",
        image:
          "https://th.bing.com/th/id/OIP.KsfmNeU2sKhik-WMn8mlTgHaEK?rs=1&pid=ImgDetMain",
        fees: "£12,500 - £14,000",
        courses:
          "Business, Sport and Exercise Science, Tourism and Hospitality",
      },
      {
        name: "Newcastle University",
        fees: "16,500 - £24,500",
        courses: "Medicine, Computer Science, Engineering",
        image:
        "https://th.bing.com/th/id/OIP.01JBEc5-PqNKmiz6Ph55SwHaDd?w=600&h=281&rs=1&pid=ImgDetMain",
      },
      {
        name: "University of Essex",
        fees: "£14,700 - £19,500",
        courses: "Economics, Psychology, Computer Science",
      },
      {
        name: "Northumbria University",
        fees: "£13,000 - £15,500",
        courses: "Computer Science, Nursing, Business",
      },
    ],

    scholarships: [
      {
        name: "Chevening Scholarship",
        image:
          "https://th.bing.com/th/id/OIP.UfFT7mGo8Y9tygLNB-OKjAHaEK?rs=1&pid=ImgDetMain",
        details:
          "This scholarship is provided to students with extraordinary academic achievements and also leadership skills. The recipients of the scholarships are selected by British Embassies all around the world.",
      },
      {
        name: "Erasmus Mundus Scholarship",
        image:
        "https://flexyinfo.com/wp-content/uploads/2023/01/Erasmus-Mundus-Scholarship1.webp",
        details:
          "This is a highly reputed scholarship. The acceptance rate is less than 5% which makes it highly competitive. The recipient gets €31000 per year for two years.",
      },
      {
        name: "University of London Varadi Distance Learning Scholarship",
        details:
          "This scholarship is offered to applicants with outstanding academic results and leadership abilities. The full tuition fee of studying at the University of London is covered. Students from anywhere in the world can apply for this scholarship.",
      },
      {
        name: "International Excellence Scholarship in the UK",
        details:
          "This scholarship is offered by the University of Roehampton to international students. This award is worth up to £4000 per year. Students with great results in postgraduate and Bachelors can get this scholarship.",
      },
    ],
  },
  {
    id: 2,
    name: "Canada",
    banner:"/banners/canada.webp",
    programs:"Incididunt cupidatat eiusmod cillum dolor anim. Reprehenderit est magna aliqua adipisicing eiusmod. Voluptate in magna nulla nulla. Nisi exercitation ipsum cillum proident et incididunt non excepteur fugiat do duis dolor irure. Sit eu commodo ut ex sunt cillum cupidatat ea fugiat. Velit quis irure incididunt cillum nulla id tempor amet cupidatat.",
    keyFacts:[
      { 
        student_population:"2 million",
        currency:"Canadian Dollar $",
        language:"English & French",
        universities:96,
      },
    ],
    flag:"/assets/flags/canada.png",
    requirement: [
      {
        ques: "Acceptance from a Canada University:",
        ans:
          "In order to be eligible, a UK academic institution must make a formal offer of acceptance. This can be verified with the issuance of a Confirmation of Acceptance for Studies (CAS) from the university in question.",
      },
      {
        ques: "English Language Proficiency:",
        ans:
          "It is important to prove your capabilities in the English language. One way to do this is by taking a certified English exam such as TOEFL, IELTS, or PTE Academic. Before enrolling in any university, it is highly suggested to check their official webpage for the specific score required. This way, all requirements are fulfilled accordingly.",
      },
      {
        ques: "Financial Requirements:",
        ans:
          "As part of the application process, it is essential to demonstrate that one has enough funds to pay for tuition and living costs while studying. This amount could depend on where and how long the course is, thus necessitating proof through bank statements or letters of financial sponsorship.",
      },
      {
        ques: "Visa Application:",
        ans:
          "For students wishing to study in the United Kingdom and coming from Nepal or other specified nations, a Tier 4 (General) Student Visa is essential. Obtaining said visa usually requires a few steps, from submitting an online application form to providing evidence that one has both financial stability and English language proficiency, as well as the necessary documents such as a valid passport, a CAS reference number from their university of choice, TB test results (where applicable), passport-size photographs, and the visa fee. Depending on the UK embassies or consulate's wishes, additional paperwork may be requested.",
      },
    ],

    university: [
      {
        name: "Cardiff Metropolitan Uinversity",
        fees: "£12,500 - £14,000",
        courses:
          "Business, Sport and Exercise Science, Tourism and Hospitality",
      },
      {
        name: "Newcastle University",
        fees: "16,500 - £24,500",
        courses: "Medicine, Computer Science, Engineering",
      },
      {
        name: "University of Essex",
        fees: "£14,700 - £19,500",
        courses: "Economics, Psychology, Computer Science",
      },
      {
        name: "Northumbria University",
        fees: "£13,000 - £15,500",
        courses: "Computer Science, Nursing, Business",
      },
    ],

    scholarships: [
      {
        name: "Chevening Scholarship:",
        details:
          "This scholarship is provided to students with extraordinary academic achievements and also leadership skills. The recipients of the scholarships are selected by British Embassies all around the world.",
      },
      {
        name: "Erasmus Mundus Scholarship",
        details:
          "This is a highly reputed scholarship. The acceptance rate is less than 5% which makes it highly competitive. The recipient gets €31000 per year for two years.",
      },
      {
        name: "University of London Varadi Distance Learning Scholarship",
        details:
          "This scholarship is offered to applicants with outstanding academic results and leadership abilities. The full tuition fee of studying at the University of London is covered. Students from anywhere in the world can apply for this scholarship.",
      },
      {
        name: "International Excellence Scholarship in the UK",
        details:
          "This scholarship is offered by the University of Roehampton to international students. This award is worth up to £4000 per year. Students with great results in postgraduate and Bachelors can get this scholarship.",
      },
    ],
    img: "https://c0.wallpaperflare.com/preview/783/732/25/architecture-buildings-canada-city.jpg",
    map: "https://th.bing.com/th/id/R.7c34b96cb2d1b18a9eeb972407b397dd?rik=BbAfPbhkSKfbjQ&pid=ImgRaw&r=0",
    desc: "Canada is renowned for its high-quality education and welcoming multicultural society. With a reputation for safety, innovation, and stunning scenery, it's a top choice for those seeking a well-rounded study abroad experience.",
  },
  {
    id: 3,
    name: "New Zealand",
    programs:"Esse quis eu commodo irure eu eiusmod qui eu. Incididunt officia anim anim anim dolore. Commodo sint elit anim sint sunt ex enim ea sunt cupidatat do dolore officia anim.",
    keyFacts:[
      { 
        student_population:"1.5 million",
        currency:"Australian Dollar $",
        language:"English",
        universities:20,
      },
    ],
    flag:"/assets/flags/new.png",
    banner:"/banners/auckland.webp",
    map: "https://cdn.pixabay.com/photo/2015/08/15/22/34/new-zealand-890250_1280.png",
    img: "https://th.bing.com/th/id/R.a7dcde209b4465bd404f09d93e462628?rik=mqE15I2yrN0P9A&riu=http%3a%2f%2fst.gde-fon.com%2fwallpapers_original%2f634461_auckland_new-zealand_gorod_4673x3117_www.Gde-Fon.com.jpg&ehk=w01V1XkEo%2fvTiM8EPZLrZiDSZgrvrSwAqmL3xPgrAIM%3d&risl=&pid=ImgRaw&r=0",
    desc: "Ireland consistently ranks top 20 globally for quality of life, safety, and human development. Its rich history, vibrant culture, and top-tier institutions attract students seeking excellent education in a welcoming environment.",
    requirement: [
      {
        ques: "Acceptance from a UK University:",
        ans:
          "In order to be eligible, a UK academic institution must make a formal offer of acceptance. This can be verified with the issuance of a Confirmation of Acceptance for Studies (CAS) from the university in question.",
      },
      {
        ques: "English Language Proficiency:",
        ans:
          "It is important to prove your capabilities in the English language. One way to do this is by taking a certified English exam such as TOEFL, IELTS, or PTE Academic. Before enrolling in any university, it is highly suggested to check their official webpage for the specific score required. This way, all requirements are fulfilled accordingly.",
      },
      {
        ques: "Financial Requirements:",
        ans:
          "As part of the application process, it is essential to demonstrate that one has enough funds to pay for tuition and living costs while studying. This amount could depend on where and how long the course is, thus necessitating proof through bank statements or letters of financial sponsorship.",
      },
      {
        ques: "Visa Application:",
        ans:
          "For students wishing to study in the United Kingdom and coming from Nepal or other specified nations, a Tier 4 (General) Student Visa is essential. Obtaining said visa usually requires a few steps, from submitting an online application form to providing evidence that one has both financial stability and English language proficiency, as well as the necessary documents such as a valid passport, a CAS reference number from their university of choice, TB test results (where applicable), passport-size photographs, and the visa fee. Depending on the UK embassies or consulate's wishes, additional paperwork may be requested.",
      },
    ],

    university: [
      {
        name: "Cardiff Metropolitan Uinversity",
        fees: "£12,500 - £14,000",
        courses:
          "Business, Sport and Exercise Science, Tourism and Hospitality",
      },
      {
        name: "Newcastle University",
        fees: "16,500 - £24,500",
        courses: "Medicine, Computer Science, Engineering",
      },
      {
        name: "University of Essex",
        fees: "£14,700 - £19,500",
        courses: "Economics, Psychology, Computer Science",
      },
      {
        name: "Northumbria University",
        fees: "£13,000 - £15,500",
        courses: "Computer Science, Nursing, Business",
      },
    ],

    scholarships: [
      {
        name: "Chevening Scholarship:",
        details:
          "This scholarship is provided to students with extraordinary academic achievements and also leadership skills. The recipients of the scholarships are selected by British Embassies all around the world.",
      },
      {
        name: "Erasmus Mundus Scholarship",
        details:
          "This is a highly reputed scholarship. The acceptance rate is less than 5% which makes it highly competitive. The recipient gets €31000 per year for two years.",
      },
      {
        name: "University of London Varadi Distance Learning Scholarship",
        details:
          "This scholarship is offered to applicants with outstanding academic results and leadership abilities. The full tuition fee of studying at the University of London is covered. Students from anywhere in the world can apply for this scholarship.",
      },
      {
        name: "International Excellence Scholarship in the UK",
        details:
          "This scholarship is offered by the University of Roehampton to international students. This award is worth up to £4000 per year. Students with great results in postgraduate and Bachelors can get this scholarship.",
      },
    ],
  },
  {
    id: 4,
    name: "England",
    programs:"Aliquip Lorem nulla minim veniam quis anim minim id quis irure sunt sunt ex ex. Exercitation magna esse laboris exercitation reprehenderit tempor dolor est esse eiusmod veniam culpa est magna. Est quis labore pariatur est non. Non fugiat ut et voluptate deserunt commodo anim velit enim in do laborum cillum ullamco. Nostrud non amet eiusmod amet minim do nostrud do ut ut. Excepteur consectetur sunt id nulla qui dolor consectetur amet. Ullamco mollit dolore cillum ut consequat voluptate.",
    keyFacts:[
      { 
        student_population:"2 million",
        currency:"Pound £",
        language:"English",
        universities:106,
      },
    ],
    flag:"/assets/flags/england.png",
    banner:"/banners/london.jpg",
    img: "https://th.bing.com/th/id/R.130813cc50b09f60861459a5c554078a?rik=by1PQH3lt8P3LQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-aQrAmRh5Gfo%2fTpvWIawIPNI%2fAAAAAAAABMM%2faH6F0J8yuoE%2fs1600%2fAmazing%2bTower%2bBridge%2bin%2bLondon%2bwallpapers.jpg&ehk=Zw28KachQjnEf2waSUNiZWccUDl3XM9%2f3rZTS2OqhFs%3d&risl=&pid=ImgRaw&r=0",
    desc: "The United Kingdom is home to some of the world’s finest and oldest universities and colleges. Experience a tradition of academic excellence and research innovation, with access to top-quality education that shapes future leaders across diverse fields.",
    requirement: [
      {
        ques: "Acceptance from a UK University",
        ans:
          "In order to be eligible, a UK academic institution must make a formal offer of acceptance. This can be verified with the issuance of a Confirmation of Acceptance for Studies (CAS) from the university in question.",
      },
      {
        ques: "English Language Proficiency",
        ans:
          "It is important to prove your capabilities in the English language. One way to do this is by taking a certified English exam such as TOEFL, IELTS, or PTE Academic. Before enrolling in any university, it is highly suggested to check their official webpage for the specific score required. This way, all requirements are fulfilled accordingly.",
      },
      {
        ques: "Financial Requirements",
        ans:
          "As part of the application process, it is essential to demonstrate that one has enough funds to pay for tuition and living costs while studying. This amount could depend on where and how long the course is, thus necessitating proof through bank statements or letters of financial sponsorship.",
      },
      {
        ques: "Visa Application",
        ans:
          "For students wishing to study in the United Kingdom and coming from Nepal or other specified nations, a Tier 4 (General) Student Visa is essential. Obtaining said visa usually requires a few steps, from submitting an online application form to providing evidence that one has both financial stability and English language proficiency, as well as the necessary documents such as a valid passport, a CAS reference number from their university of choice, TB test results (where applicable), passport-size photographs, and the visa fee. Depending on the UK embassies or consulate's wishes, additional paperwork may be requested.",
      },
    ],

    university: [
      {
        name: "Cardiff Metropolitan Uinversity",
        fees: "£12,500 - £14,000",
        image:
          "https://th.bing.com/th/id/OIP.KsfmNeU2sKhik-WMn8mlTgHaEK?rs=1&pid=ImgDetMain",
        courses:
          "Business, Sport and Exercise Science, Tourism and Hospitality",
      },
      {
        name: "Newcastle University",
        image:
          "https://th.bing.com/th/id/OIP.01JBEc5-PqNKmiz6Ph55SwHaDd?w=600&h=281&rs=1&pid=ImgDetMain",
        fees: "£16,500 - £24,500",
        courses: "Medicine, Computer Science, Engineering",
      },
      {
        name: "University of Essex",
        image:
          "https://beyondthebox.com/wp-content/uploads/2023/08/Colchester-Campus-DSC_1881-HDR-800x452-1.jpg",
        fees: "£14,700 - £19,500",
        courses: "Economics, Psychology, Computer Science",
      },
      {
        name: "Northumbria University",
        image:
          "https://th.bing.com/th/id/OIP.Fem7uA9S6ZY11iYzvxUzcwHaE8?rs=1&pid=ImgDetMain",
        fees: "£13,000 - £15,500",
        courses: "Computer Science, Nursing, Business",
      },
    ],

    scholarships: [
      {
        name: "Chevening Scholarship:",
        image:
          "https://th.bing.com/th/id/OIP.UfFT7mGo8Y9tygLNB-OKjAHaEK?rs=1&pid=ImgDetMain",
        details:
          "This scholarship is provided to students with extraordinary academic achievements and also leadership skills. The recipients of the scholarships are selected by British Embassies all around the world.",
      },
      {
        name: "Erasmus Mundus Scholarship",
        image:
          "https://flexyinfo.com/wp-content/uploads/2023/01/Erasmus-Mundus-Scholarship1.webp",
        details:
          "This is a highly reputed scholarship. The acceptance rate is less than 5% which makes it highly competitive. The recipient gets €31000 per year for two years.",
      },
      {
        name: " London Varadi Distance Learning Scholarship",
        image:
          "https://th.bing.com/th/id/OIP.G7HYDoqIZe0sdb-y9qL1WQHaE7?rs=1&pid=ImgDetMain",
        details:
          "This scholarship is offered to applicants with outstanding academic results and leadership abilities. The full tuition fee of studying at the University of London is covered. Students from anywhere in the world can apply for this scholarship.",
      },
      {
        name: "International Excellence Scholarship in the UK",
        image:
          "https://th.bing.com/th/id/OIP.59PKHnP-xcF0Sv3uGdYCnAHaEK?rs=1&pid=ImgDetMain",
        details:
          "This scholarship is offered by the University of Roehampton to international students. This award is worth up to £4000 per year. Students with great results in postgraduate and Bachelors can get this scholarship.",
      },
    ],
  },
  {
    id: 5,
    name: " USA",
    programs:"Voluptate aute aute fugiat exercitation nostrud in ullamco aliquip ut duis id eu mollit. Do ut excepteur id laboris est minim et consectetur duis dolor ullamco nisi labore. Proident anim laborum sint sunt aute laborum duis sunt consequat magna elit irure dolor et. Quis nulla veniam minim amet nisi fugiat non ad.",
    keyFacts:[
      { 
        student_population:"16 million",
        currency:"US Dollar $",
        language:"English",
        universities:"1400+",
      },
    ],
    flag:"/assets/flags/usa.png",
    short_name:"",
    banner:"https://wallpaperaccess.com/full/123346.jpg",
    requirement: [
      {
        ques: "Acceptance from a UK University:",
        ans:
          "In order to be eligible, a UK academic institution must make a formal offer of acceptance. This can be verified with the issuance of a Confirmation of Acceptance for Studies (CAS) from the university in question.",
      },
      {
        ques: "English Language Proficiency:",
        ans:
          "It is important to prove your capabilities in the English language. One way to do this is by taking a certified English exam such as TOEFL, IELTS, or PTE Academic. Before enrolling in any university, it is highly suggested to check their official webpage for the specific score required. This way, all requirements are fulfilled accordingly.",
      },
      {
        ques: "Financial Requirements:",
        ans:
          "As part of the application process, it is essential to demonstrate that one has enough funds to pay for tuition and living costs while studying. This amount could depend on where and how long the course is, thus necessitating proof through bank statements or letters of financial sponsorship.",
      },
      {
        ques: "Visa Application:",
        ans:
          "For students wishing to study in the United Kingdom and coming from Nepal or other specified nations, a Tier 4 (General) Student Visa is essential. Obtaining said visa usually requires a few steps, from submitting an online application form to providing evidence that one has both financial stability and English language proficiency, as well as the necessary documents such as a valid passport, a CAS reference number from their university of choice, TB test results (where applicable), passport-size photographs, and the visa fee. Depending on the UK embassies or consulate's wishes, additional paperwork may be requested.",
      },
    ],

    university: [
      {
        name: "Cardiff Metropolitan Uinversity",
        fees: "£12,500 - £14,000",
        image:
          "https://beyondthebox.com/wp-content/uploads/2023/08/Colchester-Campus-DSC_1881-HDR-800x452-1.jpg",
        courses:
          "Business, Sport and Exercise Science, Tourism and Hospitality",
      },
      {
        name: "Newcastle University",
        fees: "16,500 - £24,500",
        image:
          "https://beyondthebox.com/wp-content/uploads/2023/08/Colchester-Campus-DSC_1881-HDR-800x452-1.jpg",
        courses: "Medicine, Computer Science, Engineering",
      },
      {
        name: "University of Essex",
        fees: "£14,700 - £19,500",
        image:
          "https://beyondthebox.com/wp-content/uploads/2023/08/Colchester-Campus-DSC_1881-HDR-800x452-1.jpg",
        courses: "Economics, Psychology, Computer Science",
      },
      {
        name: "Northumbria University",
        fees: "£13,000 - £15,500",
        image:
          "https://beyondthebox.com/wp-content/uploads/2023/08/Colchester-Campus-DSC_1881-HDR-800x452-1.jpg",
        courses: "Computer Science, Nursing, Business",
      },
    ],
    
    scholarships: [
      {
        name: "Chevening Scholarship:",
        details:
          "This scholarship is provided to students with extraordinary academic achievements and also leadership skills. The recipients of the scholarships are selected by British Embassies all around the world.",
      },
      {
        name: "Erasmus Mundus Scholarship",
        details:
          "This is a highly reputed scholarship. The acceptance rate is less than 5% which makes it highly competitive. The recipient gets €31000 per year for two years.",
      },
      {
        name: "University of London Varadi Distance Learning Scholarship",
        details:
          "This scholarship is offered to applicants with outstanding academic results and leadership abilities. The full tuition fee of studying at the University of London is covered. Students from anywhere in the world can apply for this scholarship.",
      },
      {
        name: "International Excellence Scholarship in the UK",
        details:
          "This scholarship is offered by the University of Roehampton to international students. This award is worth up to £4000 per year. Students with great results in postgraduate and Bachelors can get this scholarship.",
      },
    ],
    map: "https://i.redd.it/na0ode07l3571.jpg",
    img: "https://wallpaperaccess.com/full/123346.jpg",
    desc: "Boasting 33 of the world’s top 100 universities, as well as being home to the financial, technology, aerospace, healthcare and entertainment hubs of the world, the United States is a land of educational and career opportunities for international students.",
  },

  {
    id: 6,
    name: "Ireland",
    programs:"Consectetur cupidatat exercitation consectetur deserunt qui excepteur ad et occaecat nulla dolor. Esse labore dolor deserunt elit veniam occaecat adipisicing eiusmod aute eu qui proident enim esse. Id amet labore dolor proident fugiat minim consectetur voluptate ad exercitation do esse. Dolor anim mollit cillum ut officia. Sit cillum do ea in ad dolor quis sint cillum occaecat mollit.",
    keyFacts:[
      { 
        student_population:"226,000",
        currency:"Euro €",
        language:"English",
        universities:"36",
      },
    ],
    flag:"/assets/flags/ireland.png",
    banner:"/banners/ireland.webp",
    requirement: [
      {
        ques: "Acceptance from a UK University:",
        ans:
          "In order to be eligible, a UK academic institution must make a formal offer of acceptance. This can be verified with the issuance of a Confirmation of Acceptance for Studies (CAS) from the university in question.",
      },
      {
        ques: "English Language Proficiency:",
        ans:
          "It is important to prove your capabilities in the English language. One way to do this is by taking a certified English exam such as TOEFL, IELTS, or PTE Academic. Before enrolling in any university, it is highly suggested to check their official webpage for the specific score required. This way, all requirements are fulfilled accordingly.",
      },
      {
        ques: "Financial Requirements:",
        ans:
          "As part of the application process, it is essential to demonstrate that one has enough funds to pay for tuition and living costs while studying. This amount could depend on where and how long the course is, thus necessitating proof through bank statements or letters of financial sponsorship.",
      },
      {
        ques: "Visa Application:",
        ans:
          "For students wishing to study in the United Kingdom and coming from Nepal or other specified nations, a Tier 4 (General) Student Visa is essential. Obtaining said visa usually requires a few steps, from submitting an online application form to providing evidence that one has both financial stability and English language proficiency, as well as the necessary documents such as a valid passport, a CAS reference number from their university of choice, TB test results (where applicable), passport-size photographs, and the visa fee. Depending on the UK embassies or consulate's wishes, additional paperwork may be requested.",
      },
    ],

    university: [
      {
        name: "Cardiff Metropolitan Uinversity",
        fees: "£12,500 - £14,000",
        courses:
          "Business, Sport and Exercise Science, Tourism and Hospitality",
      },
      {
        name: "Newcastle University",
        fees: "16,500 - £24,500",
        courses: "Medicine, Computer Science, Engineering",
      },
      {
        name: "University of Essex",
        fees: "£14,700 - £19,500",
        courses: "Economics, Psychology, Computer Science",
      },
      {
        name: "Northumbria University",
        fees: "£13,000 - £15,500",
        courses: "Computer Science, Nursing, Business",
      },
    ],

    scholarships: [
      {
        name: "Chevening Scholarship:",
        details:
          "This scholarship is provided to students with extraordinary academic achievements and also leadership skills. The recipients of the scholarships are selected by British Embassies all around the world.",
      },
      {
        name: "Erasmus Mundus Scholarship",
        details:
          "This is a highly reputed scholarship. The acceptance rate is less than 5% which makes it highly competitive. The recipient gets €31000 per year for two years.",
      },
      {
        name: "University of London Varadi Distance Learning Scholarship",
        details:
          "This scholarship is offered to applicants with outstanding academic results and leadership abilities. The full tuition fee of studying at the University of London is covered. Students from anywhere in the world can apply for this scholarship.",
      },
      {
        name: "International Excellence Scholarship in the UK",
        details:
          "This scholarship is offered by the University of Roehampton to international students. This award is worth up to £4000 per year. Students with great results in postgraduate and Bachelors can get this scholarship.",
      },
    ],
    map: "https://media.istockphoto.com/id/1770656871/vector/vector-map-of-ireland-with-counties-and-administrative-divisions-editable-and-clearly.jpg?s=612x612&w=0&k=20&c=nYadzTJFwIyn27EuOXDiqP7W53wsz0EBrEB2M50n1WA=",
    img: "https://th.bing.com/th/id/R.4a9e0b755b2a3ccb102f5c575ee8d1cb?rik=p%2bNQDg6CDQTw%2bw&pid=ImgRaw&r=0",
    desc: "Ireland consistently ranks top 20 globally for quality of life, safety, and human development. Its rich history, vibrant culture, and top-tier institutions attract students seeking excellent education in a welcoming environment.",
  },
];

export const classesData = [
  {
    id: 1,
    logo:"/test/ielts.jpg",
    title: "IELTS",
    summary:"IELTS is the most trusted and renowned English language test. IELTS certification is required for both academic and immigration purposes.",
    summary2:"In the realm of global communication, a strong command of the English language is a bridge that connects cultures, , and aspirations. The International English.",
    ques:
      "The International English Language Testing System (IELTS) is a widely recognized English proficiency test. It was first introduced in 1980 and has since become one of the most popular English language tests worldwide. The test is designed to assess an individual’s ability to understand and use the English language in academic and general contexts.",
    aboutImg:
      "https://www.englishexplorer.com.sg/wp-content/uploads/2022/10/4-incredible-things-you-can-do-with-an-ielts-certificate.jpg",
    testFormat: [
      {  icon:<FaSpeakap/>,
        color:"text-green-500",
        name: "Speaking(S)",
        duration: "24-30 minutes",
      },
      {  icon:<LuPencilLine/>,
        color:"text-blue-400",
        name: "Writing(W)",
        duration: "24-30 minutes",
      },
      { icon:<FaBookOpenReader/>,
        color:"text-red-500",
        name: "Reading(R)",
        duration: "29-30 minutes",
      },
      { icon:<FaEarListen/>,
        color:"text-yellow-400",
        name: "Listening(L)",
        duration: "30-34 minutes",
      },
    ],
    registration: {
      list1: (
        <p className=" leading-loose">
          1) First, find an authorized IELTS test center near you.
          <br />
          2) Then, choose a convenient test date from the available options.
          <br />
          3) Complete the registration process online or in person, providing
          your personal details and selecting the test type (Academic or General
          Training).
          <br />
          4) Pay the required test fee, and you will receive a confirmation
          email with your test details.
          <br />
          5) Prepare for the test by familiarizing yourself with the format and
          practicing sample questions.
          <br />
          6) On the test day, arrive early at the designated test center with
          your identification document.
        </p>
      ),
    },
    testImg:
      "https://www.englishpace.com/wp-content/uploads/2024/02/ielts-academic-guide.jpg",
  },

  {
    id: 2,
    title: "PTE",
    logo:"/test/pearson.png",
    summary:"Pearson Test of English is the most trusted and renowned English language test. PTE certification is required for both academic and immigration purposes.",
    summary2:"In the realm of global communication, a strong command of the English language is a bridge that connects cultures, , and aspirations. The International English.",
    ques:
      "The Pearson Test of English (PTE) is a computer-based English language proficiency exam that assesses the reading, writing, speaking, and listening skills of non-native English speakers. It is widely recognized and accepted by universities and colleges around the world as a reliable measure of English language proficiency.",
    aboutImg:
      "https://edubenchmark.com/blog/wp-content/uploads/2018/08/pte-test-do.jpg",
    testFormat: [
      {  icon:<FaSpeakap/>,
        color:"text-green-500",
        name: "Speaking(S)",
        duration: "24-30 minutes",
      },
      {  icon:<LuPencilLine/>,
        color:"text-blue-400",
        name: "Writing(W)",
        duration: "24-30 minutes",
      },
      { icon:<FaReadme/>,
        color:"text-red-500",
        name: "Reading(R)",
        duration: "29-30 minutes",
      },
      { icon:<FaEarListen/>,
        color:"text-yellow-400",
        name: "Listening(L)",
        duration: "30-34 minutes",
      },
    ],
    registration: {
      list1: (
        <p className=" leading-loose">
          1) First, find an authorized PTE test center near you.
          <br />
          2) Then, choose a convenient test date from the available options.
          <br />
          3) Complete the registration process online or in person, providing
          your personal details and selecting the test type (Academic or General
          Training).
          <br />
          4) Pay the required test fee, and you will receive a confirmation
          email with your test details.
          <br />
          5) Prepare for the test by familiarizing yourself with the format and
          practicing sample questions.
          <br />
          6) On the test day, arrive early at the designated test center with
          your identification document.
        </p>
      ),
    },
    testImg:
      "https://thenext.edu.np/wp-content/uploads/2022/07/pte-classes-in-kathmandu.png",
  },
];

export const blogItems = [
  {
    id: 1,
    img: "https://th.bing.com/th/id/R.0001962bbefb12a299e9012877a7aa44?rik=%2fHtmmn3qTTXULg&pid=ImgRaw&r=0",
    title: "Scholarships to study at Keele University",
    author: "Shirish Shrestha",
    date: "28 Aug 2024",
    category: "Education",
    desc: "Mollit in elit duis consectetur reprehenderit non pariatur anim amet excepteur enim ad. Consequat pariatur cillum fugiat aliquip enim officia et esse est qui tempor esse nostrud anim. Amet commodo aliquip elit ea sint eu. Irure nostrud excepteur culpa nisi tempor occaecat aute mollit Lorem aliquip commodo elit. Cupidatat nisi anim cupidatat est dolor labore Lorem eiusmod mollit magna magna reprehenderit id magna.Ipsum aute nisi ea quis. Irure ullamco et minim culpa aliqua nostrud mollit deserunt. Duis est pariatur nisi reprehenderit labore laboris Lorem incididunt nisi.",
  },
  {
    id: 2,
    img: "https://i.pinimg.com/originals/0b/54/57/0b5457a50f154d3490e7338ea4c0dcac.jpg",
    title: "Why Study Master of Nursing in Australia?",
    author: "Harry Potter",
    date: "20 Mar 2024",
    category: "Careers",
    desc: "Et eu ullamco tempor veniam ad velit minim et Lorem Lorem sit est. Eiusmod nisi consectetur ut exercitation excepteur. Esse aliqua pariatur sit tempor duis laborum quis sit dolore quis in consectetur. Magna cillum ad reprehenderit non non ipsum sunt deserunt eu eu deserunt.Nulla duis reprehenderit ad pariatur. Sunt in laborum pariatur ea irure. Quis eu labore est anim cupidatat mollit elit et.",
  },
  {
    id: 3,
    img: "https://th.bing.com/th/id/OIP.k1cUJfLyuniDkc_hVKSQVQHaE8?rs=1&pid=ImgDetMain",
    title: "Eligibility Requirements to Study in the USA",
    desc: "Ex excepteur in nisi non sint aute consectetur mollit anim adipisicing voluptate nostrud sit. Velit ex eiusmod consectetur officia labore enim occaecat exercitation deserunt occaecat. Anim Lorem sunt nostrud incididunt. Laborum ex esse laborum ad ut culpa et aliquip laboris laboris voluptate ad. Consectetur ea ex anim sint nulla eu adipisicing eu mollit non dolore occaecat ex. Commodo et reprehenderit incididunt do sint laboris non qui elit nulla dolor deserunt. Nulla ea minim sint eu.",
    author: "John Doe",
    category: "Destination",
    date: "14 Feb 2024",
  },
  {
    id: 4,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Lionel Messi",
    category: "Education",
    date: "09 Jan 2024",
  },
  {
    id: 5,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Executioner",
    category: "Careers",
    date: "14 Jun 2024",
  },
  {
    id: 6,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Lionel Messi",
    category: "Destination",
    date: "24 Jul 2024",
  },
  {
    id: 7,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Lionel Richie",
    category: "Education",
    date: "24 Jul 2024",
  },
  {
    id: 8,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Spiderman",
    category: "Destination",
    date: "24 Jul 2024",
  },
  {
    id: 9,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "The Batman",
    category: "Education",
    date: "24 Jul 2024",
  },
  {
    id: 10,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Mike Bale",
    category: "Careers",
    date: "24 Jul 2024",
  },
];

export const eventItems = [
  {
    id: 1,
    img: "https://www.thejobfairs.co.uk/images/jobfair_og.jpg",
    title: "IT Job fair 2025",
    author: "Shirish Shrestha",
    time:"8:00 AM",
    date: "Aug 28 2024",
    day:<p  className=" font-[500] text-white">SAT <br/> <span className=" text-[20px] font-semibold">07</span></p>,
    category: "Upcoming Event",
    location:"Balambu, Kathmandu",
    desc: "Ipsum aute nisi ea quis. Irure ullamco et minim culpa aliqua nostrud mollit deserunt. Duis est pariatur nisi reprehenderit labore laboris Lorem incididunt nisi.",
  },
  {
    id: 2,
    img: "https://th.bing.com/th/id/OIP.HcheBtyVgjqMsdIER6OGnwHaE7?rs=1&pid=ImgDetMain",
    title: "Career counseling from Experts",
    author: "Harry Potter",
    day:<p  className=" font-[500]">WED <br/> <span className=" text-[20px] font-semibold">12</span></p>,
    date: "Mar 20 2024",
    time:"11:00 AM",
    category: "Past Event",
    location:"Imadol, Lalitpur",
    desc: "Nulla duis reprehenderit ad pariatur. Sunt in laborum pariatur ea irure. Quis eu labore est anim cupidatat mollit elit et.",
  },
  {
    id: 3,
    img: "https://th.bing.com/th/id/OIP.k1cUJfLyuniDkc_hVKSQVQHaE8?rs=1&pid=ImgDetMain",
    title: "Eligibility Requirements to Study in the USA",
    desc: "Consectetur ea ex anim sint nulla eu adipisicing eu mollit non dolore occaecat ex. Commodo et reprehenderit incididunt do sint laboris non qui elit nulla dolor deserunt. Nulla ea minim sint eu.",
    author: "John Doe",
    category: "Ongoing Event",
    day:<p  className=" font-[500] ">MON <br/> <span className=" text-[20px] font-semibold">18</span></p>,
    date: "Feb 14 2024",
    time:"9:00 AM",
    location:"Sundhara, Kathmandu",
  },
  {
    id: 4,
    img: "https://edison365.com/wp-content/uploads/2022/03/How-do-hackathons-work-1024x576.png",
    title: "Hackathon Fair",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Lionel Messi",
    category: "Upcoming Event",
    day:<p  className=" font-[500] ">WED <br/> <span className=" text-[20px] font-semibold">22</span></p>,
    date: "Jan 09 2024",
    time:"10:00 AM",
    location:"Sankamul, Kathmandu",
  },
  {
    id: 5,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "Online Quiz Competetion 2024",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Executioner",
    category: "Past Event",
    time:"01:00 PM",
    location:"Thankot, Kathmandu",
    date: "Jun 14 2024",
  },
  {
    id: 6,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "Developers Meet 2024, Kathmandu",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Lionel Messi",
    category: "Ongoing Event",
    date: "Jul 23 2024",
    time:"02:00 PM",
    location:"Balambu, Kathmandu",
  },
  {
    id: 7,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "Deerwalk Institute Hackathon Fair",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Lionel Richie",
    category: "Past Event",
    time:"8:00 AM",
    date: "Jul 25 2024",
    location:"Gurjudhara, Kathmandu",
  },
  {
    id: 8,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Spiderman",
    category: "Ongoing Event",
    time:"8:00 AM",
    date: "Aug 10 2024",
    location:"Naikap, Kathmandu",
  },
  {
    id: 9,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "The Batman",
    category: "Upcoming Event",
    date: "Aug 12 2024",
    time:"10:00 AM",
    location:"Hattiban, Lalitpur",
  },
  {
    id: 10,
    img: "https://th.bing.com/th/id/OIP.d1Dw8WswEEOJpJwTDDvyzQHaEK?rs=1&pid=ImgDetMain",
    title: "A Guide to TOEFL iBT and IELTS Online Test",
    desc: "Sit est et ipsum duis commodo proident eiusmod in ea voluptate. Labore non ad mollit labore laborum ea mollit incididunt culpa est quis ea est et. Enim incididunt laborum nulla officia excepteur. Elit pariatur sunt velit ad non cillum cillum laboris. Ad non est consectetur reprehenderit Lorem adipisicing voluptate sint laborum non.",
    author: "Mike Bale",
    category: "Past Event",
    date: "Aug 16 2024",
    time:"10:00 AM",
    location:"Thaiba, Lalitpur",
  },
];

export const AdminSidebar = [
  {
    id: 20,
    icon: <MdHomeMax />,
    title: "Dashboard",
    path: "/admin",
  },
  {
    id: 21,
    icon: <MdEventNote />,
    title: "Appointments",
    path: "/admin/appointment",
  },
  {
    id: 25,
    icon: <PiSealQuestionFill />,
    title: "Inquiries",
    path: "/admin/inquirydetails",
  },
  {
    id: 29,
    icon: <MdEvent />,
    title: "Events",
    icon2:<MdArrowForwardIos/>,
    path:"",
    submenu: [
      {
        name: "Event List",
        specificPath: "Event Details",
        path: "/admin/addevents",
        icon: <MdEventRepeat />,
      },
      {
        name: "Add Event",
        specificPath: "Add Event",
        path: "/admin/eventform",
        icon: <MdAddCard />,
      },
    ],
    
  },
  {
    id: 24,
    icon: <PiNewspaperClippingBold />,
    title: "Blogs",
    icon2:<MdArrowForwardIos/>,
    path: "",
    submenu: [
      {
        id: 231,
        name: "Blog List",
        specificPath: "Blog Details",
        path: "/admin/addblogs",
        icon: <FaList />,
      },
      {
        id: 123,
        name: "Add Blog",
        specificPath: "Add Blogs",
        path: "/admin/blogform",
        icon: <MdAddToPhotos />,
      },
    ],
  },

  {
    id: 25,
    icon: <FaUsers />,
    title: "User",
    path: "#",
    icon2:<MdArrowForwardIos/>,
    submenu: [
      {
        name: "Add User",
        specificPath: "Create User",
        path: "/admin/createuser",
        icon: <FaUserPlus />,
      },
      {
        name: "Permissions",
        specificPath: "Permissions",
        path: "/admin/permissions",
        icon: <FaFileCircleCheck />,
      },
      {
        name: "Roles",
        specificPath: "Roles",
        path: "/admin/roles",
        icon: <FaUserGear />,
      },
    ],
  },
  {
    id:26,
    title:"Pages Management",
    icon:<MdOutlineStickyNote2/>,
    path:"#",
    icon2:<MdArrowForwardIos/>,
    submenu: [
      {
        name: "Home Page",
        specificPath: "Home Page",
        path: "/admin/home-page",
        icon: <TbHomeEdit />,
      },
    ],


  }
];

export const adminHeads = [
  {
    id: 87,
    icon: <HiMiniBellAlert />,
    title: "Message",
    message: "This is message panel",
  },
  {
    id: 27,
    icon: <MdChat />,
    title: "Notification",
    message: "This is notification panel",
  },
];

export const appointmentItems = [
  {
    id: 1,
    date: "Jul 20 2024",
    time:"11:00 AM",
    name: "Shirish Shrestha",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "--|--",
    time:" --|--",
    name: "Suresh Maharjan",
    status: "Pending",
  },
  {
    id: 3,
    date: "--|--",
    time:"--|--",
    name: "Suresh Maharjan",
    status: "Pending",
  },
  {
    id: 4,
    date: "--|--",
    time:"--|--",
    name: "Suresh Maharjan",
    status: "Pending",
  },
  {
    id: 5,
    date: "Jul 21 2024",
    time:"12:00 PM",
    name: "John Doe",
    status: "Confirmed",
  },
  {
    id:6,
    date: "--|--",
    time:"--|--",
    name: "Suresh Maharjan",
    status: "Pending",
  },
  {
    id: 7,
    date: "Jul 21 2024",
    time:"11:00 AM",
    name: "Suresh Gupta",
    status: "Confirmed",
  },
  {
    id: 8,
    date: "Jul 21 2024",
    time:"02:00 PM",
    name: "Suresh Gupta",
    status: "Confirmed",
  },
  {
    id: 9,
    date: "Jul 21 2024",
    time:"02:00 PM",
    name: "Suresh Gupta",
    status: "Confirmed",
  },
];
export const inquiryItems = [
  {
    id: 1,
    subject: "Visa Time",
    email:"shakestha@gmail.com",
    name: "Ram Shrestha",
    date:"Dec 20, 2024 ",
    content: "Officia consectetur incididunt elit nisi quis ad excepteur ex velit. Eu exercitation in cillum velit excepteur culpa. Excepteur adipisicing qui sit non cupidatat in dolore velit dolor. Deserunt pariatur excepteur pariatur commodo amet.",
  },
  {
    id: 2,
    subject: "Pricing Details",
    email:"shakestha@gmail.com",
    name: "Sujan Pradhan",
    date:"Dec 25, 2024",
    content: "Tempor labore ut nulla officia. Excepteur pariatur pariatur elit veniam incididunt. Consectetur eu elit elit incididunt consectetur exercitation nulla eu labore non culpa aute sit. Fugiat in velit qui exercitation laborum Lorem sint amet exercitation commodo amet nostrud sunt. Nulla ullamco elit eiusmod Lorem id sint eiusmod. Nulla consequat amet fugiat deserunt. Velit do sint tempor nostrud voluptate Lorem proident.",
  },
  {
    id: 3,
    subject: "Pricing Details",
    email:"shakestha@gmail.com",
    name: "Sujan Pradhan",
    date:"Dec 29, 2024 ",
    content: "Elit exercitation quis nulla velit commodo fugiat enim laborum minim labore pariatur et Lorem. Anim et magna quis consequat. Mollit aute in enim quis occaecat. Laborum mollit labore nulla non sunt amet quis nostrud est dolore consectetur non quis officia. Do occaecat incididunt deserunt exercitation eu tempor aute ex exercitation tempor. Dolor reprehenderit adipisicing dolore esse nisi amet aliqua reprehenderit consequat enim ullamco.",
  },
  {
    id: 4,
    subject: "Course Prices",
    email:"shiristha321@gmail.com",
    name: "Shirish Pradhan",
    date:"Dec 29, 2024 ",
    content: "Sunq mollit sit reprehenderit consectetur aliqua quis amet magna anim aliquip velit ea. Commodo tempor sint aliqua in excepteur esse nulla duis veniam officia nulla qui Lorem aliqua. Duis laboris reprehenderit eu aliqua amet amet do cupidatat pariatur mollit. In proident esse id elit ut nisi mollit consequat exercitation nostrud non.",
  },
 
];


export const userRoles=[
  {
    id:10,
    name:"Ian Chestnut",
    email:"iannut@gmail.com",
    role:"Super Admin",
    group:"SysQube",
  },
  {
    id:11,
    name:"Shirish Shrestha",
    email:"shirihstha@gmail.com",
    role:"Super Admin",
    group:"SysQube",
  },
  {
    id:12,
    name:"Ian Chestnut",
    email:"iannut@gmail.com",
    role:"Super Admin",
    group:"SysQube",
  },
  {
    id:13,
    name:"Tarack Aksum",
    email:"tracy.aksum@gmail.com",
    role:"Contributer",
    group:"SysQube",
  },
  {
    id:14,
    name:"John Does",
    email:"doe.john@gmail.com",
    role:"Contributer",
    group:"SysQube",
  },
  {
    id:15,
    name:"Ian Gruffard",
    email:"iangruff@gmail.com",
    role:"Admin",
    group:"SysQube",
  }
]

export const socialLinks=[
  {
      title:"Facebook",
      icon:<FaFacebookF/>,
      link:"",
  },
  {
      title:"LinkedIn",
      icon:<FaLinkedinIn/>,
      link:"",
  },
  {
      title:"Facebook",
      icon:<FiInstagram/>,
      link:"",
  },
]

export const faqItems = [
  {
    id: 1,
    ques: "Why study abroad?",
    ans: "Et eiusmod proident mollit in voluptate laboris do do cillum anim nisi ad consectetur mollit. Ad duis cupidatat incididunt velit labore velit id reprehenderit ex in commodo laborum eu minim. Sint irure aute minim et ex eu cupidatat minim amet ex esse fugiat ex cillum.",
  },
  {
    id: 2,
    ques: "Where and what to study?",
    ans: "Et eiusmod proident mollit in voluptate laboris do do cillum anim nisi ad consectetur mollit. Irure nostrud do elit non irure. Veniam ad ex exercitation eu irure culpa pariatur. Est fugiat excepteur sunt aliqua Lorem incididunt. Cillum irure aute reprehenderit reprehenderit enim esse tempor officia. Ipsum enim cupidatat quis dolor aliquip non mollit ad dolor non aliqua enim.",
  },
  {
    id: 3,
    ques: "How do I apply for consultation?",
    ans: "Aliqua in et magna aliquip commodo mollit tempor irure consequat eiusmod duis cillum. Irure est ad excepteur eu. Nostrud cillum laboris eu quis commodo consectetur quis. Minim ipsum esse qui tempor ut ipsum elit ad culpa officia. Nisi cillum duis nostrud sunt occaecat excepteur. Enim exercitation tempor laborum in commodo consectetur consectetur ullamco duis enim ea commodo adipisicing occaecat.",
  },
  {
    id: 4,
    ques: "After receiving an offer?",
    ans: "Nisi cillum dolor voluptate et mollit excepteur pariatur esse adipisicing proident. Dolor cupidatat excepteur fugiat dolore laborum. Eiusmod aute dolore deserunt in occaecat exercitation magna ea quis pariatur. Quis anim sint officia commodo sit dolor ex nostrud anim sunt nostrud. Duis cillum do qui enim reprehenderit anim ullamco cillum sunt fugiat magna sunt. Aliqua velit consequat esse voluptate.",
  },
  {
    id: 5,
    ques: "Prepare to depart details",
    ans: "Consectetur sunt officia enim ullamco reprehenderit tempor.Voluptate dolore sint sit ex ea sint pariatur aliquip deserunt ipsum fugiat ut nostrud. Aliquip dolore labore elit commodo nulla deserunt deserunt mollit officia aliqua laboris. Lorem elit occaecat irure occaecat. Aliquip labore irure ex elit do eu enim.",
  },
  {
    id: 6,
    ques: "How to prepare for test",
    ans: "Id sint anim aliqua dolor eiusmod reprehenderit. Nostrud consectetur anim in eu ullamco culpa. Consectetur sunt officia enim ullamco reprehenderit tempor.",
  },
];

export const detailsNav = [
  { title: " Test Format", path: "format" },
  { title: " How to Register ?", path: "register" },
  { title: " Score Scale", path: "score" },
  { title: " FAQ's", path: "faq" },
];

