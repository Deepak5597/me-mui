import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Redirect({ pathname }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(pathname, { replace: true })
    });

    return '';
}

export default Redirect;
