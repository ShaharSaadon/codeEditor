import { Card, CardContent, Grid, Typography } from '@mui/material';
import { loadCodeBlocks } from '../store/actions/codeBlock.actions';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader'
import PropTypes from 'prop-types';
export function Lobby({ setTitle }) {
    const codeBlocks = useSelector((storeState) => storeState.codeBlockModule.codeBlocks)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Lobby';
        dispatch(loadCodeBlocks())
        setTitle('Choose Code Block')
    }, [])

    if (!codeBlocks || codeBlocks.length === 0) return <Loader />
    return (
        <div className='cards-container'>
            <Grid container spacing={2} >
                {Array.isArray(codeBlocks) && codeBlocks.map((block) => (
                    <Grid item xs={12} sm={6} md={4} key={block._id}>
                        <Link to={`/codeblock/${block._id}`}>
                            <Card className='code-block-card'>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {block.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

Lobby.propTypes = {
    setTitle: PropTypes.func.isRequired
};