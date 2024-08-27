import "./toggleSwitch.css";

// eslint-disable-next-line react/prop-types
function ToggleSwitch({checked, onInput}) {
  return (
    <>
      <input 
      type="checkbox" 
      id="toggleSwitch" 
      className="toggle" 
      checked={checked}
      value={true}
      onChange={(event) => {
        onInput(event);
      }}
       />
      <label htmlFor="toggleSwitch" className="label">
        <div className="ball"></div>
      </label>
    </>
  );
}

export default ToggleSwitch;
