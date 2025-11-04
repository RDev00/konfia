import { useRef, useEffect, useState } from 'react';

export default function VideoPreview(){
	const videoSection = useRef(null);

	useEffect(() => {
		const video = videoSection.current;
		const constraints = {
			video: { facingMode: "environment" },
			audio: false
		};

		navigator.mediaDevices.getUserMedia(constraints)
		.then(stream => {
			if("srcObject" in video) { video.srcObject = stream; }
				else { video.src = window.URL.createObjectURL(stream) }
		})
		.catch(err => { console.error("Ha ocurrido un error al mostrar la vista previa", err)})
	}, [])

	return (
		<video ref={videoSection} autoPlay playsInline className="absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)] object-cover rounded-md w-full block aspect-square"></video>
	)
}