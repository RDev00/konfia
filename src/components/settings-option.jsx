import Icon from '@mdi/react';

export default function SettingsOption(props){
	return (
		<button onClick={props.function} className="w-full px-2 py-1 flex gap-1 hover:bg-gray-300 active:bg-gray-300 items-center text-lg">
			<Icon path={props.icon} size={1} />
			{props.text}
		</button>
	)
}