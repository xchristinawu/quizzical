export default function Dropdown(props) {
    return (
        <label className="dropdown-label">
            {props.label}
            <select 
                className="dropdown-select" 
                value={props.value} 
                onChange={event => props.onChange(event.target.value)}
            >
                {props.options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    )
}