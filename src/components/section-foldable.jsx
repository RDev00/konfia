import { useEffect, useState } from 'react';

import { Icon } from '@mdi/react';
import { mdiMenu } from '@mdi/js';

import getUserData from '../hooks/get-data.user';

export default function SectionFoldable(props){
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		const getClients = async() => {
			const clients = props.clients;
			const usersRaw = []

			clients.forEach(async(client) => {
				const data = await getUserData(client.user);
				usersRaw.push(data);

				console.log(data)
			});
		};

		getClients();

		const clientsExample = [
			{ username: "Example", "" }
		]
	}, []);

	return(
		<section className="w-[90dvw] max-w-150 bg-gray-200 rounded-t-md flex items-center px-5 py-3 relative z-2">
			<p className="text-xl"> {props.text} </p>
			<button className="ml-auto cursor-pointer duration-200 hover:scale-110"
				onClick={props.function}>
				<Icon path={mdiMenu} size={1} />
			</button>

			<section className="absolute z-0 top-[100%] left-0 bg-gray-400 w-full px-5 py-1 text-white">
				hello-world
			</section>
		</section>
	)
}