import React, { useState, useEffect } from 'react';
import { Table, Tag } from "antd";

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

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            render: (_, { language }) => language.toUpperCase(),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Verified',
            dataIndex: 'verifiedEmail',
            key: 'verified',
            render: (_, { verifiedEmail }) => verifiedEmail ? 'Yes' : '',
        },
        {
            title: 'Lists',
            dataIndex: 'lists',
            key: 'lists',
            render: (_, { lists }) => (
                <>
                    {lists.map((list) => {
                        return (
                            <Tag color='red' key={list}>
                                {list.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Interests',
            key: 'interests',
            dataIndex: 'interests',
            render: (_, { interests }) => (
                <>
                    {interests.map((interest) => {
                        return (
                            <Tag color={'green'} key={interest}>
                                {interest.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    return <div>
        {subscribers.length === 0 ?
            <div className='admin__centered'>
                < CustomSpinner text="Loading subscribers" />
            </div >
            :
            <Table
                className='admin__table'
                dataSource={subscribers}
                columns={columns}
                scroll={true}
            />
        }
    </div >
}