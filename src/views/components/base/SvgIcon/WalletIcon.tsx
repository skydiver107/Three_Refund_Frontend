import React, { Fragment } from "react";
import { useRouter } from "next/router";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const WalltIcon = (props: SvgIconProps) => {
    const linkRouter = useRouter();

    React.useEffect(() => {
        (async () => {

        })()
    }, []);

    return (
        <SvgIcon
            {...props}
        >
            <svg viewBox="0 0 113 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.7 0H16.95C7.6049 0 0 7.55255 0 16.8333V84.1667C0 93.4474 7.6049 101 16.95 101H101.7C107.932 101 113 95.9668 113 89.7778V11.2222C113 5.03317 107.932 0 101.7 0ZM16.95 89.7778C13.8312 89.7778 11.3 87.2584 11.3 84.1667V16.8333C11.3 13.7416 13.8312 11.2222 16.95 11.2222H101.7V28.0556H67.8C61.568 28.0556 56.5 33.0887 56.5 39.2778V61.7222C56.5 67.9113 61.568 72.9444 67.8 72.9444H101.706V89.7778H16.95ZM101.7 39.2778V61.7222H67.8V39.2778H101.7Z" fill="#1E1E1E" />
            </svg>


        </SvgIcon>
    );
};

export default WalltIcon;
