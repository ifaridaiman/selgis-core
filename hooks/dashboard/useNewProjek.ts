'use client'
import { useState } from 'react';

export const useNewProjek = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const nextStep = () => {
        setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    };

    const scrollStep = () => {
        
    };

    return { currentStep, nextStep, prevStep };
}