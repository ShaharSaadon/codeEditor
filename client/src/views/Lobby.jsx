import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadCodeBlocks } from '../store/actions/codeBlock.actions';





export function Lobby() {

    const codeBlocks = useSelector((storeState) => storeState.codeBlockModule.codeBlocks)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Lobby';
        dispatch(loadCodeBlocks())
    }, [])

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