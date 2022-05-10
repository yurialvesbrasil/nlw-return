import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

export function ClouseButton() {
    return (
        <Popover.Button className="top-5 right-5 absolute text-text-secundary hover:text-text-primary focus:text-text-primary focus:ring-brand-500 focus:ring-1 focus:outline-none focus:rounded-sm" title="Fechar formulário de feedback.">
            <X weight="bold" className="w-4 h-4" />
        </Popover.Button>
    )
}