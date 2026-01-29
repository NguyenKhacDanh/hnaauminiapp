// Augment zmp-ui module to provide correct SnackbarProvider type for TSX usage
import * as React from 'react'

declare module 'zmp-ui' {
  export interface SnackbarProps {
    style?: React.CSSProperties
    className?: string
    children?: React.ReactNode
    zIndex?: number
  }

  // Declare SnackbarProvider as a React component so it can be used in JSX
  export const SnackbarProvider: React.ComponentType<SnackbarProps>
}
