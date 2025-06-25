import React from 'react';
import styled from 'styled-components';

const SucessCard = () => {
    return (
        <StyledWrapper>
            <div className="results-summary-container">
                <div className="confetti">
                    {[...Array(20)].map((_, i) => (
                        <div className="confetti-piece" key={i} />
                    ))}
                </div>
                <div className="results-summary-container__result">
                    <div className="heading-secondary">Thank You!</div>
                    <p className="paragraph text-center">
                        Your feedback means a lot to us. <br />
                        We truly appreciate you taking the time to share your thoughts!
                    </p>
                </div>

            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .results-summary-container {
    font-family: "Hanken Grotesk", sans-serif;
    display: flex;
    flex-direction: column;
    width: 320px;
    border-radius: 30px;
    box-shadow: 10px 20px 20px rgba(120, 87, 255, 0.3);
    background-image: linear-gradient(to bottom, #734b6d, #42275a);
    padding: 30px 20px;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .heading-secondary {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 10px;
  }

  .paragraph {
    font-size: 16px;
    line-height: 1.4;
    color: hsl(221, 100%, 96%);
  }

  .confetti {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    pointer-events: none;
  }

  .confetti-piece {
    position: absolute;
    width: 10px;
    height: 20px;
    background-color: hsl(39, 100%, 56%);
    top: 0;
    opacity: 0;
    animation: makeItRain 3000ms infinite linear;
  }

  ${[...Array(20)].map(
    (_, i) => `.confetti-piece:nth-child(${i + 1}) {
      left: ${5 * (i + 1)}%;
      transform: rotate(${(Math.random() * 120 - 60).toFixed(0)}deg);
      animation-delay: ${(Math.random() * 500).toFixed(0)}ms;
      animation-duration: ${(1500 + Math.random() * 2000).toFixed(0)}ms;
    }`
).join('')}

  .confetti-piece:nth-child(odd) {
    background-color: hsl(0, 100%, 67%);
  }

  .confetti-piece:nth-child(even) {
    background-color: #c33764;
  }

  @keyframes makeItRain {
    from {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    to {
      transform: translateY(300px);
      opacity: 0;
    }
  }
`;

export default SucessCard;
