import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.colors.background.light};
    color: ${({ theme }) => theme.colors.text.primary};
    transition: background-color 0.3s, color 0.3s;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .ant-picker-dropdown {
    max-width: 90vw; /* Limit the popup width to 90% of the viewport width */
    min-width: 300px; /* Set a minimum width */
    padding: 10px; /* Add some padding for better aesthetics */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: enhance the shadow */
  }

  .ant-picker-panel-container {
    max-width: 100%; /* Ensure the panel adjusts within the dropdown */
  }

  /* Adjust font sizes and spacing for smaller screens */
  @media (max-width: 768px) {
    .ant-picker-calendar-header, .ant-picker-time-panel {
      font-size: 10px; /* Smaller text for small devices */
      overflow-x: scroll !important;

    }

    .ant-picker-dropdown {
      font-size: 10px !important; /* Smaller text for small devices */
      overflow-x: scroll !important;
      width: 100%;
      width: 300px;
    }

    .ant-picker-cell {
      padding: 4px; /* Adjust cell padding for small screens */
    }
  }

  /* Optional: Add specific adjustments for very narrow screens */
  @media (max-width: 480px) {
    .ant-picker-cell {
      padding: 2px; /* Smaller padding for very narrow screens */
    }
  }
`;
