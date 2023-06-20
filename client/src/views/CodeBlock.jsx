import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SOCKET_URL } from '../services/http.service.js';
import { updateCodeBlock } from '../store/actions/codeBlock.actions.js';
import { useDispatch } from 'react-redux';

import { io } from 'socket.io-client';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { codeBlockService } from '../services/codeBlock.service';

export function CodeBlock() {
    const { id } = useParams()
    const [codeBlock, setCodeBlock] = useState({ id: '', title: '', code: '' })
    const [isTeacher, setIsTeacher] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const socketRef = useRef();

    useEffect(() => {
        document.title = `CodeBlock ${id}`;
        console.log('loading codeBlock...')
        loadCodeBlock()

        // Create a socket connection
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('is teacher', (isTeacher) => {
            setIsTeacher(isTeacher);
        });

        console.log('socketRef:', socketRef)
        // Listen for 'code change' events from the server
        socketRef.current.on('code change', (updatedCodeBlock) => {
            if (updatedCodeBlock._id === id) {
                setCodeBlock(updatedCodeBlock);
            }
        });

        return () => {
            // Disconnect the socket when the component unmounts
            socketRef.current.disconnect();
        };
    }, [id])

    async function loadCodeBlock() {
        try {
            const codeBlock = await codeBlockService.getById(id);
            setCodeBlock(codeBlock);
        } catch (error) {
            console.log('error:', error);
        }
    }
    async function save() {
        dispatch(updateCodeBlock(codeBlock));
    }
    function handleCodeChange(newCode) {
        setCodeBlock(prevCodeBlock => ({ ...prevCodeBlock, code: newCode }))

        // Emit a 'code change' event to the server
        socketRef.current.emit('code change', { ...codeBlock, code: newCode });
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
                    enableLiveAutocompletion: true,
                    readOnly: isTeacher
                }}
                style={{ width: '100%', height: '400px' }}
            />

            <button onClick={goBack}>Back</button>
            <button onClick={save}>run & save</button>
        </div>
    )
}
