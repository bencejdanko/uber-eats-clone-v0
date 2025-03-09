import { Customer } from "@/types";
import React, { useEffect, useRef } from "react";
import { Edit3 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { uploadFile } from "@/services/api";

import { Input } from "@/components/ui/input";

import { CroppieWrapper } from "@/components/CroppieWrapper";
import { useState } from "react";

import { useAppDispatch } from "@/app/hooks";
import { setCustomer } from "@/features/customers/auth";
import { LoadingSpinnerToCheck } from "@/components";
import { useNavigate } from "react-router-dom";
//import { useUploadFileMutation } from "@/services/api";

function ProfilePictureChangeWrapper(
    { children, customer }: { children: React.ReactNode; customer: Customer },
) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    //const [uploadFile] = useUploadFileMutation();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    function base64ToBlob(base64: string) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(base64.split(",")[1]);

        // separate out the mime component
        var mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], { type: mimeString });
    }

    const handleSubmit = async (croppedImage: string) => {
        setIsLoading(true);
        const blob = base64ToBlob(croppedImage);
        const url = URL.createObjectURL(blob);

        const data = await uploadFile(blob);

        dispatch(setCustomer({
            ...customer,
            profile_picture: url,
        }));
        setIsLoading(false);
        setIsSuccess(true);
    };

    return (
        <Dialog onOpenChange={() => setFile(null)}>
            <DialogTrigger asChild>
                <div className="inline-block relative group cursor-pointer">
                    {children}
                    <div className="rounded-full absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity">
                    </div>
                    <Edit3 className="absolute bottom-0 right-0 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Profile picture upload</DialogTitle>
                <Input type="file" onChange={handleFileChange} />
                <CroppieWrapper file={file} onSubmit={handleSubmit} />
                {(isLoading || isSuccess) && (
                    <LoadingSpinnerToCheck
                        isSuccess={isSuccess}
                        onComplete={() => navigate("/explore")}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}

export { ProfilePictureChangeWrapper };
