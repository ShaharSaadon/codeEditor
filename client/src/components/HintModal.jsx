
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black',
};

export function HintModal({ isModalOpen, handleClose, hint }) {
    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Typography id="modal-modal-title" variant="0" component="h2">
                    Hey! It's great ask for help when you need🌞
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                    {hint}
                </Typography>
            </Box>
        </Modal>
    );
}