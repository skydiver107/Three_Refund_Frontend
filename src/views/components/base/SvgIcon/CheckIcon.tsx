import React, { Fragment } from "react";
import { useRouter } from "next/router";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CheckIcon = (props: SvgIconProps) => {
    const linkRouter = useRouter();

    React.useEffect(() => {
        (async () => {

        })()
    }, []);

    return (
        <SvgIcon
            {...props}
        >
            <svg viewBox="0 0 137 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.7502 82.3173L11.4327 49.9998L0.427734 60.9273L43.7502 104.25L136.75 11.2498L125.823 0.322266L43.7502 82.3173Z" fill="#1E1E1E" />
            </svg>
        </SvgIcon>
    );
};

export default CheckIcon;
