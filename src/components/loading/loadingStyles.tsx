import { css, keyframes } from "@emotion/react";

export const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: scale(0);
    }
    50% {
        transform: scale(1);
    }
`;

export const loadingStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    color: #666;

    .loading-text {
        font-size: 24px;
        font-weight: bold;
        margin-right: 10px;
    }

    .loading-dots {
        display: flex;
        align-items: center;

        div {
            width: 12px;
            height: 12px;
            margin: 0 4px;
            border-radius: 50%;
            background-color: #007bff;
            animation: ${bounce} 1.5s infinite;
        }

        div:nth-of-type(2) {
            animation-delay: 0.3s;
        }

        div:nth-of-type(3) {
            animation-delay: 0.6s;
        }
    }
`;