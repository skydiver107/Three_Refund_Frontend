import React, { Fragment } from "react";
import { useRouter } from "next/router";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const UnCheckedIcon = (props: SvgIconProps) => {
    const linkRouter = useRouter();

    React.useEffect(() => {
        (async () => {

        })()
    }, []);

    return (
        <SvgIcon
            {...props}
        >
            <svg viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.26465 3.13477H28.596V-2.86523H4.26465V3.13477ZM29.596 4.13477V28.4661H35.596V4.13477H29.596ZM28.596 29.4661H4.26465V35.4661H28.596V29.4661ZM3.26465 28.4661V4.13477H-2.73535V28.4661H3.26465ZM4.26465 29.4661C3.71236 29.4661 3.26465 29.0184 3.26465 28.4661H-2.73535C-2.73535 32.3321 0.398659 35.4661 4.26465 35.4661V29.4661ZM29.596 28.4661C29.596 29.0184 29.1483 29.4661 28.596 29.4661V35.4661C32.462 35.4661 35.596 32.3321 35.596 28.4661H29.596ZM28.596 3.13477C29.1483 3.13477 29.596 3.58248 29.596 4.13477H35.596C35.596 0.26877 32.462 -2.86523 28.596 -2.86523V3.13477ZM4.26465 -2.86523C0.398653 -2.86523 -2.73535 0.268776 -2.73535 4.13477H3.26465C3.26465 3.58248 3.71237 3.13477 4.26465 3.13477V-2.86523Z" fill="#EDEDED" />
            </svg>
        </SvgIcon>
    );
};

export default UnCheckedIcon;
