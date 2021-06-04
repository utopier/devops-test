// css reset : emotion-reset

// 공통 Design 적용
// font
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/core';

const GlobalStyles = () => {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}
          body {
            background-color: #232931;
            color: #eeeeee;
          }
          a {
            text-decoration: none;
            outline: none;
            color: #4ecca3;
          }
          *,
          *::after,
          *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
    </>
  );
};

export default GlobalStyles;
