import { Icon } from '@mdi/react'
import { mdiMenuDown } from '@mdi/js';

export default function FoldableFormLayout(props){
	return (
		<div className="w-[100dvw] h-[100dvh] fixed backdrop-blur backdrop-brightness-60 z-100 top-0 left-0 flex justify-center items-center hidden duration-200 pt-10 py-5 overflow-auto" ref={props.ref}>

			<form className="bg-white px-4 py-2 w-[300px] flex flex-col justify-center items-center rounded-md gap-1 relative" ref={props.formRef} onSubmit={props.submitFunction}>

				<button type="button" className="w-full flex justify-center items-center cursor-pointer" onClick={props.closeFunction}> <Icon path={mdiMenuDown} size={1} /> </button>

				<h2 className="text-2xl mb-2 font-bold text-center"> {props.headerText} </h2>

				{props.children}

				<button className="bg-emerald-500 text-white text-lg w-[90%] px-1 py-1 rounded-sm cursor-pointer hover:brightness-90 mt-4" type="submit"> {props.submitText} </button>

				<p className="text-sm text-gray-700 my-2 text-center"> {props.message} </p>

			</form>
		</div>
	)
}