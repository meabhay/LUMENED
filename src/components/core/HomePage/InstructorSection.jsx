import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-[50%]">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-10px_-10px_0_0] sm:shadow-[-20px_-20px_0_0] w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-[50%] flex gap-6 lg:gap-10 flex-col">
            <h1 className="w-full lg:w-[70%] text-3xl lg:text-4xl font-semibold leading-tight">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-left lg:text-justify w-full lg:w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              LumenEd. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection