import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { ClouseButton } from "../../ClouseButton";
import { ScreenshotButton } from "../ScreenshotButton";


interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested }: FeedbackContentStepProps) {

    //Armazena imagem do screenshot
    const [screenshot, setScreenshot] = useState<string | null>(null);
    //Recupera informações do feedbackType escolhido
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    //Armazena o comentário do feedback
    const [comment, setComment] = useState<string>('');
    //Envia o feedback para o backend
    function handleSubmitFeedback(e: FormEvent) {
        e.preventDefault();
        console.log(`Feedback: ${comment} - ${screenshot}`);
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    onClick={onFeedbackRestartRequested}
                    className="top-5 left-5 absolute text-text-secundary hover:text-text-primary focus:text-text-primary focus:ring-brand-500 focus:ring-1 focus:outline-none focus:rounded-sm">
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <ClouseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100  bg-transparent rounded-md ring-1  ring-text-secundary focus:ring-brand-500  focus:ring-1 resize-none focus:outline-none p-2"
                    placeholder={"Deixe seu feedback..."}
                    onChange={(e) => setComment(e.target.value)}
                />

                <footer className="flex gap-2 pt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTaken={setScreenshot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-trasparent flex-1 flex justify-center items-center text-sm  hover:bg-brand-300  text-text-primary focus:ring-2 focus:ring:offset-zinc-900 focus:ring-brand-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>
    )
}