import { useEffect, useState, useRef } from "react";
import HistorySection from "./store/history-section";
import QrSection from "./user/qr-section";

export default function UserSection(props) {
  const qrSelectorButton = useRef(null);
  const historySelectorButton = useRef(null);
  const qrSection = useRef(null);
  const historySection = useRef(null);

  const openSection = (sectionOn, sectionOff, buttonOn, buttonOff) => {
    sectionOn.classList.remove('hidden');
    sectionOff.classList.add('hidden');

    buttonOn.classList.add('bg-gray-200');
    buttonOn.classList.remove('bg-gray-400');
    buttonOn.classList.add('text-slate-800');
    buttonOn.classList.remove('text-slate-100');

    buttonOff.classList.add('bg-gray-400');
    buttonOff.classList.remove('bg-gray-200');
    buttonOff.classList.add('text-slate-100');
    buttonOff.classList.remove('text-slate-800');
  }

  return (
    <section className="w-[90dvw] max-w-150 rounded-md flex flex-col items-center mb-15">
      <div className="flex w-full items-center justify-evenly">
        <button type="button" ref={qrSelectorButton} className="text-xl w-[49%] bg-gray-200 rounded-t-md text-center py-1 text-slate-800 cursor-pointer" onClick={() => { openSection(qrSection.current, historySection.current, qrSelectorButton.current, historySelectorButton.current) }}> Mi QR </button>
        <button type="button" ref={historySelectorButton} className="text-xl w-[49%] bg-gray-400 rounded-t-md text-center py-1 text-slate-100 cursor-pointer hover:brightness-105" onClick={() => { openSection(historySection.current, qrSection.current, historySelectorButton.current, qrSelectorButton.current) }}>Historial</button>
      </div>

      <QrSection UID={props.UID} ref={qrSection} />
      <HistorySection history={props.history} ref={historySection} />
    </section>
  )
}