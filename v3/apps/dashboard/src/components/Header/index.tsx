'use client'

import dynamic from "next/dynamic"
import { Fragment } from "react";

const RemoteHeader = dynamic(() => {
    const mod = import('header/nav').catch(console.error);
    return mod
}, { ssr: false })

export default function RemoteHeaderComponent() {
    return (
        <Fragment>
            <RemoteHeader />
        </Fragment>
    )
}