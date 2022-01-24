import Login from '../../containers/Login/Login';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

const AuthModal = ({ isModalOpen, handleModalClose}) => {
    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <Fade in={isModalOpen}>
                <Login />
            </Fade>
        </Modal>
    );
};

export default AuthModal;