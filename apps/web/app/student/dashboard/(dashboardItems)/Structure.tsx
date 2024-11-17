
"use client";
import PanelBox from '@components/Common/Box/PanelBox';
import { useRouter } from 'next/navigation';
import React from 'react'

const Structure = () => {
	const router = useRouter();
    return (
		<PanelBox
			onPress={() => {
				router.push("/student/dashboard/structure");
			}}
		>
			<h1>List des structures</h1>
		</PanelBox>
	);
}

export default Structure