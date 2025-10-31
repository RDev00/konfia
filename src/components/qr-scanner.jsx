import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

import { Icon } from '@mdi/react';
import { mdiQrcodeScan } from '@mdi/js';

import VideoPreview from './camera/video.preview';

export default function QrScanner(props){
  const [data, setData] = useState(null);
  const [ scanActive, setScanActive ] = useState(false);

  const toggleScan = () => {
  	if(scanActive) { setScanActive(false) }
			else { setScanActive(true) }
  }

  return (
  	<div className="flex flex-col justify-center items-center text-gray-700 w-[90%] max-w-[150px] py-2">
  		<div className="w-full aspect-square flex flex-col items-center justify-center border border-5 border-emerald-300 rounded-md relative p-3">
  			{ scanActive ? (
					<>
						<QrReader
							constraints = {{ facingMode: "environment" }}
							onResult={(result, error) => {
							if (!!result) { setData(result?.text); }
							if (!!error) { return 0; }
						}}
						/>
						<VideoPreview />
					</>
	  			) : ( <Icon path={mdiQrcodeScan} size={ 'auto' } /> )}
  		</div>

  		{ scanActive ? (
  			<button type="button" onClick={() => { toggleScan() }} className="bg-red-500 text-white w-full py-1 rounded-md mt-3 cursor-pointer duration-200 hover:scale-110 hover:brightness-90">
	  			Detener
	  		</button>
  			) : (
  			<button type="button" onClick={() => { toggleScan() }} className="bg-emerald-400 text-white w-full py-1 rounded-md mt-3 cursor-pointer duration-200 hover:scale-110 hover:brightness-90">
	  			Escanear QR
	  		</button>
  			) }

  		
  	</div>
  );
};