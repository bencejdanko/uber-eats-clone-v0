import React, { useEffect, useRef } from "react";
import Croppie, { CroppieOptions } from "croppie";
import "croppie/croppie.css";
import { Button } from "./ui/button";

interface CroppieWrapperProps {
  onSubmit: (croppedImage: string) => void;
  file?: File | null;
}

const CroppieWrapper: React.FC<CroppieWrapperProps> = ({ onSubmit, file }) => {
  const croppieRef = useRef<HTMLDivElement>(null);
  const croppieInstanceRef = useRef<Croppie | null>(null);

  useEffect(() => {
    if (croppieRef.current) {
      const croppieOptions: CroppieOptions = {
        showZoomer: true,
        enableOrientation: true,
        mouseWheelZoom: "ctrl",
        viewport: {
          width: 300,
          height: 300,
          type: "circle",
        },
        boundary: {
          width: 300,
          height: 300,
        },
      };

      croppieInstanceRef.current = new Croppie(croppieRef.current, croppieOptions);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          croppieInstanceRef.current?.bind({
            url: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    }

    return () => {
      croppieInstanceRef.current?.destroy();
    };
  }, [file]);

  const handleSubmit = async () => {
    if (croppieInstanceRef.current) {
      const croppedImage = await croppieInstanceRef.current.result({
        type: "canvas",
        format: "jpeg",
        quality: 0.8,
        size: "viewport",
      });
      onSubmit(croppedImage as string);
    }
  };

  return (
    <div className='py-20'>
      <div id="croppie" ref={croppieRef}></div>
      <Button disabled={!file} className='w-full' onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export { CroppieWrapper };