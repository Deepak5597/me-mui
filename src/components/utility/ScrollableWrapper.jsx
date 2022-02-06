import { styled } from '@mui/system';

const ScrollableWrapper = styled('div')(({ bg }) => ({
    backgroundColor: bg ? bg : "white",
    paddingBottom: 8,
    borderRadius: 4,
    height: "90vh",
    overflowY: "auto",
    width: "100%"

    // '& ::-webkit-scrollbar': {
    //     width: '0.4em',
    //     backgroundColor: "red"
    // },
    // '& ::-webkit-scrollbar-track': {
    //     boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    //     webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    // },
    // '& ::-webkit-scrollbar-thumb': {
    //     backgroundColor: 'rgba(0,0,0,.1)',
    //     outline: '1px solid slategrey'
    // }
}));

export default ScrollableWrapper;