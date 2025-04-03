// components/custom/booking-steps.tsx
import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
    currentStep: number;
    totalSteps: number;
}

export const BookingSteps: React.FC<StepProps> = ({
                                                      currentStep,
                                                      totalSteps
                                                  }) => {
    // Crear un array con los pasos
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step) => {
                    const isActive = step === currentStep;
                    const isCompleted = step < currentStep;

                    return (
                        <React.Fragment key={step}>
                            {/* Paso (círculo) */}
                            <div className="flex flex-col items-center relative">
                                <div
                                    className={cn("flex items-center justify-center w-10 h-10 rounded-full text-white font-bold transition-all duration-300", isActive && "bg-[#ff0054] border-[#ff0054] border-4 shadow-lg ring-4 ring-[#ff0054]/30 scale-110", isCompleted && "bg-green-500 border-green-500 border-4", !isActive && !isCompleted && "bg-gray-300 border-gray-300 border-4")}
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm">{step}</span>
                                    )}
                                </div>

                                {/* Etiqueta del paso */}
                                <div className="mt-2 text-xs md:text-sm font-medium text-center">
                                    {step === 1 && (
                                        <span className={cn(isActive || isCompleted ? "text-[#ff0054]" : "text-gray-500")}>
                      Service
                    </span>
                                    )}
                                    {step === 2 && (
                                        <span className={cn(isActive || isCompleted ? "text-[#ff0054]" : "text-gray-500")}>
                      Details
                    </span>
                                    )}
                                    {step === 3 && (
                                        <span className={cn(isActive || isCompleted ? "text-[#ff0054]" : "text-gray-500")}>
                      Date 
                    </span>
                                    )}
                                    {step === 4 && (
                                        <span className={cn(isActive || isCompleted ? "text-[#ff0054]" : "text-gray-500")}>
                      Payment
                    </span>
                                    )}
                                </div>
                            </div>

                            {/* Línea conectora entre pasos */}
                            {step < totalSteps && (
                                <div
                                    className={cn(
                                        "h-1 flex-1 mx-2",
                                        step < currentStep ? "bg-green-500" : "bg-gray-300"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingSteps;