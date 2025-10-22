import Layout from '../../layouts/layout';
import getCookie from '../../functions/getCookie';

export default function StoreDashboard(){
	const token = getCookie('token');
	if(!token) return window.location.href = "/";

	return (
		<Layout>
			{ /*Dashboard*/ }
		</Layout>
	)
}