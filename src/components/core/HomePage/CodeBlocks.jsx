import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10 w-full max-w-full overflow-x-hidden`}
    >
      {backgroundGradient}
      {/* Section 1 Normal Heading btn section  */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6 lg:gap-8 text-left">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-base font-bold w-full lg:w-[85%] -mt-3">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex flex-wrap gap-4 sm:gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 Running Code */}

      <div className="flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full max-w-full lg:max-w-[470px] overflow-x-auto h-fit min-h-[200px] bg-black bg-opacity-25 backdrop-blur-3xl border-pure-greys-500 border-2 border-opacity-20 rounded-lg">
      
      
        {/* Indexing */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold pt-2">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 pt-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              textAlign: "left",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
