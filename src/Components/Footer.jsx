import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const ItemTitle = "Customer Support";
  const tweetTitle = "Join Our Petsfood";

  const ItemList = [
    { text: "Track my order", link: "/order" },
    { text: "Contact us", link: "/support" },
    { text: "Returns", link: "/order" },
    { text: "Find a Monthly package", link: "/booking" },
  ];

  const tweetList = [{ desc: "Personalised offers & savings" }];

  return (
    <footer className="bg-[#1B1833] text-white">
      <div className="py-10">
      <p className="font-devonshire text-6xl  mb-3 text-center">PetsFood</p>
          {/* Customer Support Section */}
        <div className="container mx-auto flex flex-col md:flex-row justify-center lg:justify-evenly gap-10 relative">
        
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-xl font-semibold mb-4">{ItemTitle}</h4>
            <ul className="space-y-2">
              {ItemList.map((val, i) => (
                <li key={i}>
                  <a href={val.link} className="text-white hover:underline">
                    {val.text}
                  </a>
                </li>
              ))}
            </ul>
           
          </div>

          {/* Join Our Petsfood Section */}
          <div className="flex-1 text-center lg:text-left lg:ml-60">
            <h4 className="text-xl font-semibold mb-4">{tweetTitle}</h4>
            <ul className="space-y-2">
              {tweetList.map((val, i) => (
                <li key={i} className="flex items-center justify-center lg:justify-start">
                  <span>{val.desc}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="bg-[#4CAF50] text-white text-lg py-2 px-6 rounded-md mt-4 transition-all duration-300 hover:bg-[#45a049]"
            >
              Join Now
            </button>

            <ul className="flex space-x-6 mt-8 text-xl justify-center lg:justify-start">
              <li><a href="https://www.facebook.com/petsfood"><FaFacebookSquare /></a></li>
              <li><a href="https://www.Linkedin.com/petsfood"><CiLinkedin /></a></li>
              <li><a href="https://www.Instagram.com/petsfood"><GrInstagram /></a></li>
              <li><a href="https://www.Twitter.com/petsfood"><FaXTwitter /></a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#1B1833] py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-sm">
            &copy; 2025 Pets at Home Ltd Company No. 01822577. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2 md:mt-0">
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="#" className="hover:underline">
              Privacy and Policy
            </a>
            <a href="#" className="hover:underline">
              Cookies
            </a>
            <a href="#" className="hover:underline">
              Modern Slavery Statement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

