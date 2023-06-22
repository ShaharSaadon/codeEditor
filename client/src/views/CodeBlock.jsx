import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { codeBlockService } from '../services/codeBlock.service';
import { updateCodeBlock } from '../store/actions/codeBlock.actions.js';
import { useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import { ConfettiFeature } from '../components/Confetti';
import { DynamicModal } from '../components/DynamicModal'
import { useSocket } from '../hooks/useSocket';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const modalTypes = {
    HINT: 'hint',
    SOLUTION: 'solution',
}

export function CodeBlock({ setTitle }) {
    const { id } = useParams()

    const [codeBlock, setCodeBlock] = useState({ id: '', title: '', code: '' })
    const [isTeacher, setIsTeacher] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSolutionCorrect, setIsSolutionCorrect] = useState(false)
    const [modalType, setModalType] = useState('')

    const handleClose = () => setIsModalOpen(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const socket = useSocket(id, setCodeBlock, setIsTeacher);

    useEffect(() => {
        loadCodeBlock()
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

        if (normalize(newCode) === normalize(codeBlock.solution)) setIsSolutionCorrect(true)
        else setIsSolutionCorrect(false)

        // Emit a 'code change' event to the server
        socket.emit('code change', { ...codeBlock, code: newCode });

    }
    function goBack() {
        navigate(-1)
    }
    // Normalize a string by removing extra spaces and trimming it
    function normalize(str) {
        return str.replace(/\s+/g, ' ').trim();
    }
    function handleOpen(type) {
        setModalType(type)
        setIsModalOpen(true);
    }

    if (codeBlock.title === '' && codeBlock.code === '') return <Loader />

    return (
        <div className='code-block-container'>
            <h2 className='mode'>{isTeacher ? 'Teacher Mode' : 'Student Mode'}</h2>
            <h3 className='instruction'> <span> instruction</span>: {codeBlock.instruction}</h3>
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
            <div className='actions'>
                <Button variant="contained" onClick={goBack} color="error">Back</Button>
                <Button variant="contained" onClick={save} color="success">Save</Button>
                <Button variant="contained" onClick={() => handleOpen(modalTypes.HINT)} color="warning">Hint</Button>
                {isTeacher ? <Button variant="contained" onClick={() => handleOpen(modalTypes.SOLUTION)}>Solution</Button> : ''}
            </div>
            <DynamicModal isModalOpen={isModalOpen}
                handleClose={handleClose}
                text={(modalType === 'hint') ? codeBlock.hint : codeBlock.solution}
                title={(modalType === 'hint') ? 'Hey! It\'s great ask for help when you need🌞' : 'Here is the solution for you'}
            />
            <ConfettiFeature isSolutionCorrect={isSolutionCorrect} />

        </div>
    )
}

CodeBlock.propTypes = {
    setTitle: PropTypes.func.isRequired
};