import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { codeBlocks } from '../assets/codeBlocks';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

export function CodeBlock() {
    const { id } = useParams()
    const [codeBlock, setCodeBlock] = useState({ id: '', title: '', code: '' })
    const navigate = useNavigate()


    useEffect(() => {
        const foundCodeBlock = codeBlocks.find((block) => block.id === id);
        if (foundCodeBlock) {
            setCodeBlock(foundCodeBlock);
        }
    }, [id])

    function handleCodeChange(newCode) {
        setCodeBlock(prevCodeBlock => ({ ...prevCodeBlock, code: newCode }))
    }

    function goBack() {
        navigate(-1)
    }

    return (
        <div>
            <h1>{codeBlock.title}</h1>
            <AceEditor
                mode="javascript"
                theme="monokai"
                value={codeBlock.code}
                onChange={handleCodeChange}
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true
                }}
                style={{ width: '100%', height: '400px' }}
            />

            <button onClick={goBack}>Back</button>
        </div>
    )
}
