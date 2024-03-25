import './Banner.css';

import React from 'react';

export default function Banner({ source, altText, sub, link, credit }: { source: string, altText: string, sub: string, link: string, credit: string }) {

    return (
        <div className='Banner'>
            <img alt={altText} src={source} />
            <div className='subtitle'>
                <h2>{sub}</h2>
            </div>
            <p>Photo by <a href={link} target='_blank'>{credit}</a> on <a href='https://unsplash.com/' target='_blank'>Unsplash</a></p>
        </div>
    );
};