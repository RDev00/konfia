import { useEffect, useState, useRef } from 'react';

import { Icon } from '@mdi/react';
import { mdiMenu, mdiPrinterPosPause } from '@mdi/js';

import getCreditData from '../hooks/get-data.credit';

export default function SectionFoldable(props){
	const [credits, setCredits] = useState([]);
	const sectionRef = useRef(null);

	const toggleVisibility = () => {
		const currentSectionRef = sectionRef.current;

		currentSectionRef.classList.toggle('close-fold');
		currentSectionRef.classList.toggle('open-fold');

		if(currentSectionRef.classList.contains('close-fold')){
			const handleAnimationEnd = (event) => {
				if (event.animationName === 'CloseFold') {
					currentSectionRef.classList.add('hidden');
				}
				currentSectionRef.removeEventListener('animationend', handleAnimationEnd);
			};
		} else {
			currentSectionRef.classList.remove('hidden')
		}
	}

  useEffect(() => {
    async function getCredits() {
      try {
        const creditsRaw = props.credits || [];
        const results = await Promise.all(
          creditsRaw.map(async (credit) => {
            const newCredit = await getCreditData(credit.credit);
            return newCredit.credit;
          })
        );

        setCredits(results);
      } catch (error) {
        console.error("Error obteniendo créditos:", error);
        setCredits([]);
      }
    }

    getCredits();
  }, [props.credits]);
	return(
		<section className="w-[90dvw] max-w-150 bg-gray-200 rounded-t-md flex items-center px-5 py-3 relative z-2">
			<p className="text-xl"> {props.text} </p>
			<button className="ml-auto cursor-pointer duration-200 hover:scale-110"
				onClick={() => { toggleVisibility() }}>
				<Icon path={mdiMenu} size={1} />
			</button>

			<section className="absolute z-0 top-[100%] left-0 bg-gray-500 w-full px-5 py-1 text-white open-fold" ref={sectionRef}>
				{credits && credits.length > 0 ? (
					credits.map((credit) => (
						<div key={credit._id} className="flex justify-start items-center">
							<p> Usuario: {credit.username} </p>
							<p className="ml-auto text-green-500"> Crédito: {credit.credit} </p>
						</div>
					))
				) : (
					<p>No hay créditos</p>
				)}
			</section>
		</section>
	)
}