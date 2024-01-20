import React, { useState, useEffect } from 'react';
import { getSubscribers } from '../getSubscribers';
import { CustomSpinner } from '../../../components/CustomSpinner/CustomSpinnner';

export const AdminNewsletter = () => {
    const [subscribers, setSubscribers] = useState([]);

    const fetchNewsletterSubscriber = async () => {
        const results = await getSubscribers();
        setSubscribers(results);
        console.log(results)
    }

    useEffect(() => {
        fetchNewsletterSubscriber();
    }, [])

    return <div>
        {subscribers.length === 0 ?
            <div className='admin__centered'>
                < CustomSpinner text="Loading subscribers" />
            </div >
            :
            <>{subscribers.map((subscriber, index) => {
                return (
                    <div
                        className='admin__text'
                        key={index}
                    >
                        {subscriber._id} - {subscriber.email}
                    </div>
                )
            })}</>
        }
    </div >
}