import React from 'react';
import {cn} from '../../lib/utils'

function FlexSection({background,children}) {
    return (
        <div className={cn('w-full flex flex-col gap-3')}>
            {children}
        </div>
    )
}

export default FlexSection