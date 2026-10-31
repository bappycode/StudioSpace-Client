import React from 'react';

const StudioDetailsPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${id}`)
    const studioData = await res.json()
    console.log(studioData)
    return (
        <div>
            
        </div>
    );
};

export default StudioDetailsPage;