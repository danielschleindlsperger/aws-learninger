import styled from './style/styled'
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  size,
  SizeProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
} from 'styled-system'

type BoxProps = SpaceProps &
  LayoutProps &
  SizeProps &
  FontFamilyProps &
  FontSizeProps &
  FontWeightProps

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${layout}
  ${size}
  ${fontFamily}
  ${fontSize}
  ${fontWeight}
`
