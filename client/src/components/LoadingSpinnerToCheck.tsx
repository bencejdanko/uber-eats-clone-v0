import { delay, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface LoadingSpinnerToCheckProps {
    isSuccess: boolean;
    onComplete: () => void;
    successMessage?: string;
}

const LoadingSpinnerToCheck = ({
    isSuccess,
    onComplete,
    successMessage = "Success",
}: LoadingSpinnerToCheckProps) => {
    return (
        <div className="flex items-center justify-center">
            {!isSuccess
                ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                        }}
                    >
                        <Loader2 className="w-10 h-10 text-gray-500" />
                    </motion.div>
                )
                : (
                    <div className="relative w-full h-10 flex items-center">
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2"
                            initial={{ scale: 0, opacity: 0, x: 0 }}
                            animate={{ scale: 1, opacity: 1, x: -30 }}
                            transition={{
                                default: {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: 0.2,
                                },
                                x: {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: 0.6,
                                },
                            }}
                        >
                            <Check className="w-10 h-10 text-green-500" />
                        </motion.div>

                        {/* Success Message centered, then moves right */}
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 text-green-500"
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 30 }}
                            transition={{ delay: 0.6, duration: 0.25 }}
                            onAnimationComplete={() =>
                                setTimeout(onComplete, 500)}
                        >
                            {successMessage}
                        </motion.div>
                    </div>
                )}
        </div>
    );
};

export { LoadingSpinnerToCheck };
