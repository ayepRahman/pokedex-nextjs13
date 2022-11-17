import { IconName } from '@components/Icon'
import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input prefix icon
   */
  prefixIcon?: IconName
  /**
   * Input prefix icon props
   */
  prefixIconProps?: {
    className?: string
    onClick?: () => void
  }
  /**
   * Input prefix icon
   */
  suffixIcon?: IconName
  /**
   * Input suffix icon props
   */
  suffixIconProps?: {
    className?: string
    onClick?: () => void
  }

  /**
   * Input wrapper className
   */
  inputWrapperClassName?: string
  /**
   * Input className
   */
  inputClassName?: string
  /**
   * Input Label
   */
  label?: string
  /**
   * Input helper
   */
  helper?: string
  /**
   * Input hint text (displayed top right of the input)
   */
  hint?: string
  /**
   * A boolean to display error state
   */
  isError?: boolean
  /**
   * A boolean to display full width
   */
  isFullWidth?: boolean
}
