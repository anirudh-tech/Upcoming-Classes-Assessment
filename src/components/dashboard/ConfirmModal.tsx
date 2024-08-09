// src/components/ConfirmModal.tsx
import { Button } from "../ui/button"; // Adjust import based on your setup
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger>
                <Button>Open Confirm Modal</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Join</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to join this class?</p>
                <DialogFooter>
                    <Button onClick={onClose} variant="outline">
                        Close
                    </Button>
                    <Button onClick={onConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmModal;
