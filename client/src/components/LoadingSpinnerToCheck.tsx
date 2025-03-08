import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface LoadingSpinnerToCheckProps {
  isSuccess: boolean;
  onComplete: () => void;
  successMessage?: string;
}

const LoadingSpinnerToCheck = ({
  isSuccess,
  onComplete,
  successMessage = "Success"
}: LoadingSpinnerToCheckProps) => {
  return (
    <div className="flex items-center justify-center">
      {!isSuccess ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-gray-500" />
        </motion.div>
      ) : (
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.25 }}
            onAnimationComplete={() => setTimeout(onComplete, 500)}
            className="ml-2 text-green-500"
          >
            {successMessage}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export { LoadingSpinnerToCheck };
