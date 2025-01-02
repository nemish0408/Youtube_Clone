import React, { useRef, useEffect, useState } from "react";
import Close from "../svg/Close";
import { HelpOutline, ScreenshotMonitor } from "@mui/icons-material";

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [feedback, setFeedback] = useState(""); // State for textarea content

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach listener when modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup listener on unmount or when modal closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex align-middle justify-end bg-black h-screen bg-opacity-50">
      <div
        ref={modalRef}
        className="dark:bg-[#1f1f1f] flex flex-col rounded-lg h-screen shadow-lg w-1/3"
      >
        <div className="flex justify-between items-center shadow-[0_1px_4px_rgba(0,0,0,0.6)] p-4">
          <h2 className="text-xl font-semibold dark:text-[#f1f1f1]">
            Send feedback to YouTube
          </h2>
          <button onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="p-4 overflow-y-scroll h-auto scrollbar-hidden">
          <form>
            <div className="form-group">
              <label className="block text-[#f1f1f1] pb-2">
                Describe your feedback
              </label>
              <div className="border-[1px] rounded-md border-[#f1f1f1]">
                <textarea
                  rows="4"
                  placeholder="Tell us what prompted this feedback..."
                  value={feedback} // Bind to state
                  onChange={(e) => setFeedback(e.target.value)} // Update state on change
                  className="block w-full bg-transparent text-[#f1f1f1] p-[15px]"
                ></textarea>
              </div>
              <p className="block text-[#aaa] pt-2 text-sm">
                Please don’t include any sensitive information <HelpOutline />
              </p>
              <div>
                <p className="text-[#f1f1f1] block pe-4 pt-6 mb-4">
                  A screenshot will help us better understand your feedback.
                  (optional)
                </p>
                <button className="block w-full text-[#f1f1f1] py-2 rounded-lg border-[2px] hover:border-blue-400 hover:bg-[rgb(255,255,255,0.05)] border-gray-600 mt-2 mb-4">
                  <ScreenshotMonitor /> Capture screenshot
                </button>
                <input type="checkbox" className="bg-transparent bg-black" />
                <label className="ms-2 text-[#aaa]">
                  We may email you for more information or updates
                </label>
                <p className="block text-sm text-[#aaa] mt-5">
                  Some account and system information may be sent to Google. We
                  will use it to fix problems and improve our services, subject
                  to our Privacy Policy and Terms of Service. We may email you
                  for more information or updates. Go to Legal Help to ask for
                  content changes for legal reasons.
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end shadow-[0_-1px_4px_rgba(0,0,0,0.6)] px-4 py-3">
          <button
            type="submit"
            onClick={onClose}
            className={`px-4 py-2 rounded text-white ${
              feedback.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-[rgb(255,255,255,0.1)]"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
