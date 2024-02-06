import ButtonLoading from "./ButtonLoading";

const Button = ({ text, type, color = "purple", loading, onClick }) =>{

    if(loading) return <ButtonLoading/>

    return(
        <button
        onClick={onClick}
        type={type}
        className={
            `focus:outline-none text-white bg-${color}-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2`
        }
    >
        {text}
    </button>
    );
}
export default Button;
