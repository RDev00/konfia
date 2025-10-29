import { useRef, useEffect, useState } from 'react';

export default function VideoPreview(){
	const videoSection = useRef(null);
	const [ videoSrc, setVideoSrc ] = useState(null);

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true })
		.then(stream => { setVideoSrc(stream) })
		.catch(err => { console.error("Ha ocurrido un error al mostrar la vista previa", err)})
	}, [])

	return (
		<video ref={videoSection} src={videoSrc} autoPlay playsInline className="absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)] object-cover rounded-md"></video>
	)
}