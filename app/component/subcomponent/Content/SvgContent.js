import Image from "next/image"
export default function SvgContent({ src }) {
    return (
        <div >
            <div className="relative h-screen flex items-center justify-center  ">
                <Image
                    src={src}
                    alt="svg image"
                    width={500}
                    height={500}
                    className="mx-auto w-2/3 h-auto"
                    priority
                />
            </div>
        </div>
    )
}