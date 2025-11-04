import { QRCodeCanvas } from "qrcode.react";

export default function QrSection(props) {
  const userId = props.UID;

  return (
    <section ref={props.ref} className="bg-gray-200 w-full px-5 py-3 text-white rounded-b-md">
      { userId ? (
        <div className="w-full flex justify-center items-center py-2">
          <QRCodeCanvas
          value={userId}
          size={200}
          includeMargin={true}
          bgColor="#FFFFFF"
          fgColor="#000000" />
        </div>
      ) : (
        <p className="text-gray-700 text-center my-2 text-lg font-bold"> Cargando... </p>
      ) }
    </section>
  )
}