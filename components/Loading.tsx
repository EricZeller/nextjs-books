import { Spinner } from "@/components/ui/spinner";

interface LoadingSpinnerProps {
    message?: string;
}

export function LoadingSpinner({ message = "Lädt..." }: LoadingSpinnerProps) {
    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <Spinner className="text-primary size-5" />
            <p>{message}</p>
        </div>
    );
}