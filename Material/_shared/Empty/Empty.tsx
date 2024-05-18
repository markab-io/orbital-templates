/**
 * Renders an empty component with a placeholder SVG.
 * @param {Object} props - The component props.
 * @param {string} props.modelName - The name of the model.
 * @returns {JSX.Element} The rendered component.
 */
import React from "react";

const CustomEmptyIcon: React.FC = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V4ZM6 4H18V16H6V4ZM2 20C2 19.4477 2.44772 19 3 19H21C21.5523 19 22 19.4477 22 20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20Z"
      fill="#ccc"
    />
  </svg>
);

export default CustomEmptyIcon;
