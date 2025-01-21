import React from 'react';
import { cn } from '../../lib/utils';

function GridSection({children}) {
    return (
        <div className={cn('w-full grid grid-cols-12')}>
            {children}
        </div>
    )
}

export default GridSection