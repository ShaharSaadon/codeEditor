import React from 'react'
import { Link } from 'react-router-dom';

import { codeBlocks } from '../assets/codeBlocks'
export function Lobby() {
    return (
        <div>
            <h1>Choose Code Block</h1>
            <ul>
                {codeBlocks.map(block => (
                    <li key={block.id}>
                        <Link to={`/codeblock/${block.id}`}>{block.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
