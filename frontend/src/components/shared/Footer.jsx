import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer>
      <div className="container flex justify-between mt-20 px-5 py-8 border-t-2 items-center">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">
            Job<span className="text-[#1E3A8A]">Portal</span>
          </p>
          <p className="italic">
            Designed by{" "}
            <a
              href="http://www.linkedin.com/in/debanik-dutta-3347b8253/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700"
            >
              © 2024 Debanik Dutta
            </a>
            . All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="http://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2xl"
              className="hover:scale-105 hover:text-blue-500 transition duration-300 ease-in-out"
            />
          </a>
          <a
            href="http://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="2xl"
              className="hover:scale-105 hover:text-blue-500 transition duration-300 ease-in-out"
            />
          </a>
          <a
            href="http://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              size="2xl"
              className="hover:scale-105 hover:text-blue-500 transition duration-300 ease-in-out"
            />
          </a>
          <a
            href="http://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2xl"
              className="hover:scale-105 hover:text-blue-500 transition duration-300 ease-in-out"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
