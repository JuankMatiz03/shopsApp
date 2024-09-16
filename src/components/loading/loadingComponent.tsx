/** @jsxImportSource @emotion/react */
import React from 'react';
import { loadingStyle } from './loadingStyles';

/**
 * LoadingComponent
 * @returns Login component
 */
const LoadingComponent: React.FC = () => {
    return (
        <div css={loadingStyle}>
            <div className="loading-text">Loading</div>
            <div className="loading-dots">
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default LoadingComponent;
