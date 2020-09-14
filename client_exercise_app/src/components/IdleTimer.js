import React, { useRef , useState , useContext} from 'react'
import Modal from 'react-modal'
import IdleTimer from 'react-idle-timer';
import {UserContext} from '../Context';

function Idletimer() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const IdleRef = useRef(null);
    const sessionTimeoutRef = useRef(null);
    const context = useContext(UserContext);
    const { logout } = context; 

    const onIdle = ()=>{
        setModalIsOpen(true);
        sessionTimeoutRef.current = setTimeout(logmeout, 5000);
    }

    const logmeout = ()=>{
        setModalIsOpen(false);
        clearTimeout(sessionTimeoutRef.current);
        logout();
    }

    const stayActive = ()=>{
        setModalIsOpen(false);
        clearTimeout(sessionTimeoutRef.current);
    }

    
    return (
        <div>
        <IdleTimer
        ref = {IdleRef}
        timeout = {5*1000}
        onIdle = {onIdle} />

       
        <Modal isOpen={modalIsOpen} onRequestClose={stayActive} >
            <h1>U r inactive since long time...</h1>
            <button className="btn btn-primary" onClick={logmeout}>Log me out</button>
            <br/>
            <button className="btn btn-primary" onClick={stayActive}>Keep me active</button>
        </Modal>

        </div>

    
    )
}

export default Idletimer
