"use client"

import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { cssVariableResolver } from '../cssVariableResolver';

const Provider = ({ children }: {children: React.ReactNode}) => {
    return (
        <MantineProvider theme={theme} cssVariablesResolver={cssVariableResolver}>
            {children}
        </MantineProvider>
    );
}
export default Provider;