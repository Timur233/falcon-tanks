import './ButtonMid.scss'

type ButtonMidPropsType = {
    children: React.ReactNode;
    isPressed: boolean,
    buttonName: string,
    toggleButton: (buttonName: string, state: boolean) => void,

}

export const ButtonMid = (props: ButtonMidPropsType) => {
  const { children, isPressed, buttonName, toggleButton } = props;

  return (
    <button 
        className={`button-middle ${isPressed ? 'button-middle_active' : ''}`}  
        onMouseDown={toggleButton.bind({}, buttonName, true)}
        onMouseUp={toggleButton.bind({}, buttonName, false)}    
        onMouseLeave={toggleButton.bind({}, buttonName, false)}    
    >
        {children}
    </button>
  )
}
