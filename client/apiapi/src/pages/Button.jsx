import Button from '@mui/material/Button';

const CustomButton = ({ name, button, style }) => {
    return (<Button onClick={() => button()} style={{ marginTop: "20px" }} variant="contained">{name}</Button>)


}
export default CustomButton;