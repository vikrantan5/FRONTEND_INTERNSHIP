import React from 'react';

export const SpiralBinding = () => {
  const spirals = Array.from({ length: 20 });
  
  return (
    <div className="w-full py-4 bg-white flex justify-center items-center gap-4 sm:gap-6" data-testid="spiral-binding">
      {spirals.map((_, index) => (
        <div
          key={index}
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-800"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
          }}
        />
      ))}
    </div>
  );
};

export default SpiralBinding;