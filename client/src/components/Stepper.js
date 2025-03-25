import React from 'react';

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  variant = 'default',
  orientation = 'horizontal',
  className = ''
}) => {
  const isStepComplete = (stepIndex) => stepIndex < currentStep;
  const isStepCurrent = (stepIndex) => stepIndex === currentStep;

  const getStepIconContent = (step, index) => {
    if (isStepComplete(index)) {
      return <i className="fas fa-check"></i>;
    }
    return step.icon || (index + 1);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'dots':
        return {
          step: 'w-2.5 h-2.5 rounded-full',
          active: 'bg-indigo-600',
          completed: 'bg-indigo-600',
          incomplete: 'bg-gray-300',
          connector: 'border-gray-300'
        };
      case 'simple':
        return {
          step: 'font-medium',
          active: 'text-indigo-600',
          completed: 'text-gray-500',
          incomplete: 'text-gray-500',
          connector: 'border-gray-300'
        };
      default:
        return {
          step: 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
          active: 'bg-indigo-600 text-white',
          completed: 'bg-indigo-600 text-white',
          incomplete: 'bg-gray-100 text-gray-500',
          connector: 'border-gray-300'
        };
    }
  };

  const styles = getVariantClasses();

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div
                className={`
                  absolute left-4 top-8 w-0.5 h-full -ml-px
                  border-l-2 ${isStepComplete(index) ? 'border-indigo-600' : styles.connector}
                `}
              />
            )}

            {/* Step */}
            <div className="relative flex items-start group">
              <div className="flex items-center h-9">
                <button
                  onClick={() => onStepClick?.(index)}
                  disabled={!onStepClick}
                  className={`
                    ${styles.step}
                    ${isStepComplete(index) ? styles.completed : ''}
                    ${isStepCurrent(index) ? styles.active : ''}
                    ${!isStepComplete(index) && !isStepCurrent(index) ? styles.incomplete : ''}
                    ${onStepClick ? 'cursor-pointer' : 'cursor-default'}
                  `}
                >
                  {getStepIconContent(step, index)}
                </button>
              </div>
              <div className="ml-4 min-w-0">
                <div className={`
                  text-sm font-medium
                  ${isStepComplete(index) || isStepCurrent(index) ? 'text-indigo-600' : 'text-gray-500'}
                `}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-sm text-gray-500">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className={`flex items-center ${index !== 0 ? 'flex-1' : ''}`}>
          {/* Connector Line */}
          {index !== 0 && (
            <div
              className={`
                flex-1 border-t-2
                ${isStepComplete(index) ? 'border-indigo-600' : styles.connector}
              `}
            />
          )}

          {/* Step */}
          <div className="relative flex items-center">
            <button
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={`
                ${styles.step}
                ${isStepComplete(index) ? styles.completed : ''}
                ${isStepCurrent(index) ? styles.active : ''}
                ${!isStepComplete(index) && !isStepCurrent(index) ? styles.incomplete : ''}
                ${onStepClick ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              {getStepIconContent(step, index)}
            </button>

            {variant !== 'dots' && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className={`
                  text-sm font-medium
                  ${isStepComplete(index) || isStepCurrent(index) ? 'text-indigo-600' : 'text-gray-500'}
                `}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-sm text-gray-500">
                    {step.description}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Progress Stepper
export const ProgressStepper = ({
  steps,
  currentStep,
  className = ''
}) => {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        {/* Background Line */}
        <div className="h-2 bg-gray-200 rounded-full" />

        {/* Progress Line */}
        <div
          className="absolute top-0 h-2 bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        {/* Step Markers */}
        <div className="absolute top-0 left-0 w-full flex justify-between">
          {steps.map((step, index) => {
            const isComplete = index <= currentStep;
            return (
              <div
                key={index}
                className={`
                  -mt-1 w-4 h-4 rounded-full border-2 border-white
                  ${isComplete ? 'bg-indigo-600' : 'bg-gray-200'}
                `}
              >
                {step.label && (
                  <div className="absolute top-6 -left-1/2 w-max">
                    <div className={`
                      text-sm font-medium
                      ${isComplete ? 'text-indigo-600' : 'text-gray-500'}
                    `}>
                      {step.label}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Example usage:
/*
import Stepper, { ProgressStepper } from './components/Stepper';

// Basic Stepper
const steps = [
  { label: 'Cart', icon: 'fas fa-shopping-cart' },
  { label: 'Shipping', icon: 'fas fa-truck' },
  { label: 'Payment', icon: 'fas fa-credit-card' },
  { label: 'Confirmation', icon: 'fas fa-check' }
];

<Stepper
  steps={steps}
  currentStep={1}
  onStepClick={(step) => console.log(`Step ${step} clicked`)}
/>

// Stepper with Descriptions
const stepsWithDesc = [
  {
    label: 'Step 1',
    description: 'Enter basic information'
  },
  {
    label: 'Step 2',
    description: 'Upload documents'
  },
  {
    label: 'Step 3',
    description: 'Review and submit'
  }
];

<Stepper
  steps={stepsWithDesc}
  currentStep={1}
  variant="default"
  orientation="vertical"
/>

// Dots Variant
<Stepper
  steps={steps}
  currentStep={2}
  variant="dots"
/>

// Simple Variant
<Stepper
  steps={steps}
  currentStep={1}
  variant="simple"
/>

// Progress Stepper
<ProgressStepper
  steps={[
    { label: 'Start' },
    { label: 'Middle' },
    { label: 'End' }
  ]}
  currentStep={1}
/>
*/

export default Stepper;