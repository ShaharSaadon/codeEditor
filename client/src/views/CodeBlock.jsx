import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { codeBlockService } from '../services/codeBlock.service';
import { updateCodeBlock } from '../store/actions/codeBlock.actions.js';
import { SOCKET_URL } from '../services/http.service.js';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Button from '@mui/material/Button';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Loader } from '../components/Loader';
import { Box, Grid } from '@mui/material';

export function CodeBlock({ setTitle }) {
    const { id } = useParams()
    const [codeBlock, setCodeBlock] = useState({ id: '', title: '', code: '' })
    const [isTeacher, setIsTeacher] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const socketRef = useRef();

    useEffect(() => {
        loadCodeBlock()
        // Create a socket connection
        socketRef.current = io(SOCKET_URL);
        socketRef.current.on('is teacher', (isTeacher) => {
            setIsTeacher(isTeacher);
        });

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

    useEffect(() => {
        document.title = `CodeBlock ${codeBlock.title}`;
    }, [codeBlock.title]);


    async function loadCodeBlock() {
        try {
            const codeBlock = await codeBlockService.getById(id);
            setCodeBlock(codeBlock);
            setTitle(codeBlock.title)
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

    if (codeBlock.title === '' && codeBlock.code === '') return <Loader />

    return (
        <div>
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


            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '100px' }}>
                <Button variant="contained" onClick={goBack} sx={{ mr: '100px' }}>Back</Button>
                <Button variant="contained" onClick={save}>Save</Button>
            </Box>

        </div>
    )
}
