import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from 'sonner'

export function NewNoteCard() {

    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
    const [content, setContent] = useState('')

    function handleStartEditor() {
        setShouldShowOnBoarding(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)

        if (event.target.value == '') {
            setShouldShowOnBoarding(true)
        }
    }

    function handleSaveNote(event: FormEvent) {
        console.log(content, 'content')
        event.preventDefault()

        toast.success("Nota criada com sucesso.")
    }
    
    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left'>
                <span className='text-sm font-medium text-slate-200'>
                    Adicionar nota
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                    Grave uma nota em aúdio que será convertida para texto automáticamente
                </p>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50">
                    <Dialog.Content 
                        className="fixed 
                        left-1/2 
                        top-1/2
                        -translate-x-1/2 
                        -translate-y-1/2 
                        max-w-[640px] 
                        bg-slate-700 
                        rounded-md 
                        flex 
                        flex-col
                        w-full
                        h-[68vh]
                        outline-none
                        overflow-hidden">
                        <Dialog.Close className="absolute right top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                            <X className="size-5"/>
                        </Dialog.Close>

                        <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <span className='text-sm font-medium text-slate-300'>
                                    Adicionar nota
                                </span>
                                {shouldShowOnBoarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                        Comece <button className="font-medium text-lime-400 hover:underline">gravando uma nota</button> em aúdio ou se prefereir <button className="font-medium text-lime-400 hover:underline" onClick={handleStartEditor}>utilize apenas texto.</button>
                                    </p>
                                ) : (
                                    <textarea
                                    onChange={event => handleContentChange(event)} 
                                    autoFocus 
                                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" />
                                )}
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
                                    Salvar nota
                            </button>
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}