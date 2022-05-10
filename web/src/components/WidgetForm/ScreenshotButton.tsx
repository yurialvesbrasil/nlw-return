import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from '../Loading';


interface ScreenshotButtonProps {
    onScreenshotTaken: (screenshot: string | null) => void;
    screenshot: string | null;
}

export function ScreenshotButton({ screenshot, onScreenshotTaken }: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!)
        const base64image = canvas.toDataURL('image/png')

        onScreenshotTaken(base64image)

        setIsTakingScreenshot(false)
    }

    if (screenshot) {
        return (
            <button
                type="button"
                className="w-10 h-10 p-1 bg-zinc-800 rounded-md border-transparent hover:text-text-primary hover:bg-zinc-700  focus:text-text-primary focus:ring-brand-500 focus:ring-1 focus:outline-none focus:rounded-sm flex justify-end items-end"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
                onClick={() => onScreenshotTaken(null)}
            >
                <Trash weight="fill" />

            </button>
        )
    }


    return (
        <button
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:text-text-primary hover:bg-zinc-700  focus:text-text-primary focus:ring-brand-500 focus:ring-1 focus:outline-none focus:rounded-sm"
        >
            {isTakingScreenshot ? <Loading /> : <Camera
                className="w-6 h-6 text-text-primary"
                onClick={handleTakeScreenshot}
            />}

        </button>
    )
}