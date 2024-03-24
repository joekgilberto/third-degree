import './Banner.css';

import React from 'react';

export default function Banner({ source, altText, sub }: { source: string, altText: string, sub: string }) {

    return (
        <div className='Banner'>
            <img alt={altText} src={source} />
            <div className='subtitle'>
                <h2>{sub}</h2>
            </div>
        </div>
    );
};