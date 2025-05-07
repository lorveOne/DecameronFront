import React from "react";
import { Dialog } from "../utils/Mui";
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Dialogg  = ({ open, onClose, title, children }: DialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{ padding: "20px" }}>
                <h2>{title}</h2>
                {children}
            </div>
        </Dialog>
    );
}