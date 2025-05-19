import React from 'react';
import {AddressSuggestions} from "react-dadata";
import 'react-dadata/dist/react-dadata.css';
import {useFormContext} from "react-hook-form";
import {ErrorText} from "@/components/shared/error-text";

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    const {
        formState: { errors },
    } = useFormContext();

    const errorText = errors?.["address"]?.message as string;

    return (
        <div>
            <AddressSuggestions
                token={process.env.NEXT_PUBLIC_DA_DATA_TOKEN!}
                onChange={(data) => onChange?.(data?.value)}
            />
            {errorText && <ErrorText text={errorText} />}
        </div>
    );
};