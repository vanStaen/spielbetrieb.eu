import React from "react";
import { Select } from "antd";
import { observer } from 'mobx-react';

import "./TagsFilter.less";

export const TagsFilter = observer(() => {

    return (
            <Select
                showSearch
                className="tagfilter__Select"
                style={{ width: 200 }}
                placeholder="Filter events"
                options={[
                    {
                        value: '1',
                        label: 'Not Identified',
                    },
                    {
                        value: '2',
                        label: 'Closed',
                    },
                    {
                        value: '3',
                        label: 'Communicated',
                    },
                    {
                        value: '4',
                        label: 'Identified',
                    },
                    {
                        value: '5',
                        label: 'Resolved',
                    },
                    {
                        value: '6',
                        label: 'Cancelled',
                    },
                ]}
            />
    )
})