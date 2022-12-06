import React, { Fragment } from "react";
import { useRouter } from "next/router";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const RedArrow = (props: SvgIconProps) => {
    const linkRouter = useRouter();

    React.useEffect(() => {
        (async () => {

        })()
    }, []);

    return (
        <SvgIcon
            {...props}
        >
            <svg viewBox="0 0 114 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_126_6918)">
                    <path d="M84.3877 0H47.5244L72.6611 30.5L47.5244 61H84.3877L109.524 30.5L84.3877 0Z" fill="#ED3D61" />
                    <path d="M37.5 0H25.5247L50.5495 30.5L25.5247 61H37.5L62.5247 30.5L37.5 0Z" fill="#ED3D61" />
                    <path d="M15.9752 0H4L29.0248 30.5L4 61H15.9752L41 30.5L15.9752 0Z" fill="#ED3D61" />
                </g>
                <defs>
                    <filter id="filter0_d_126_6918" x="0" y="0" width="113.524" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_126_6918" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_126_6918" result="shape" />
                    </filter>
                </defs>
            </svg>
        </SvgIcon >
    );
};

export default RedArrow;
