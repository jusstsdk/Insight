import { Multiselect } from "multiselect-react-dropdown";

function DropDownMenu(props) {
	return (
		<Multiselect
			options={props.state} // Options to display in the dropdown
			selectedValues={props.selectedState} // Preselected value to persist in dropdown
			onSelect={props.onChange} // Function will trigger on select event
			onRemove={props.onChange} // Function will trigger on remove event
			displayValue={props.displayValue} // Property name to display in the dropdown options
			placeholder={props.placeholder}
			emptyRecordMsg={props.emptyRecordMsg}
			closeOnSelect={true}
			showArrow={true}
			avoidHighlightFirstOption={true}
			hidePlaceholder={true}
		/>
	);
}
export default DropDownMenu;
