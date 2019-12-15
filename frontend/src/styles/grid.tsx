import React from 'react';
import styled, { css } from 'styled-components';
import { SizedType, ThemeSizeArg } from './theme';

type ColWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColProps {
  width?: Partial<SizedType<ColWidth>> | ColWidth;
  offset?: Partial<SizedType<ColWidth>> | ColWidth;
}

interface RowProps {
  gutter?: ThemeSizeArg;
}

const GRID_SIZE = 12 as const;
const calcWidthPct = (width: ColWidth): number => (+width / GRID_SIZE) * 100;

export const Col = styled.div<ColProps>(({ theme, width, offset }) => {
  // Calculate the width before adding breakpoints
  const baseWidth = typeof width === 'number' ? calcWidthPct(width) : 100;
  const baseOffset = typeof offset === 'number' ? calcWidthPct(offset) : 0;

  // Add column width breakpoints
  const breakpointWidths =
    typeof width === 'object' &&
    Object.keys(width).map(key => {
      const sizeKey = key as keyof SizedType;
      const colWidth = width[sizeKey]!;
      return css`
        ${theme.breakpoints.up(sizeKey)} {
          flex: 0 0 ${calcWidthPct(colWidth)}%;
          max-width: ${calcWidthPct(colWidth)}%;
        }
      `;
    });

  // Add offset widths
  const offsetWidths =
    typeof offset === 'object' &&
    Object.keys(offset).map(key => {
      const sizeKey = key as keyof SizedType;
      const colWidth = offset[sizeKey]!;
      return css`
        ${theme.breakpoints.up(sizeKey)} {
          margin-left: ${calcWidthPct(colWidth)}%;
        }
      `;
    });

  return css`
    flex: 0 0 ${baseWidth}%;
    margin-left: ${baseOffset}%;
    max-width: ${baseWidth}%;
    box-sizing: border-box;
    ${breakpointWidths}
    ${offsetWidths}
  `;
});

const OuterRow = styled.div<RowProps>(
  ({ theme, gutter }) =>
    gutter &&
    css`
      margin: 0 ${theme.spacing(gutter)};
    `
);

const InnerRow = styled.div<RowProps>(
  ({ theme, gutter }) => css`
    display: flex;
    flex-wrap: wrap;
    ${gutter &&
      css`
        margin: 0 -${theme.spacing(gutter)};
        > * {
          padding-left: ${theme.spacing(gutter)};
          padding-right: ${theme.spacing(gutter)};
          padding-bottom: ${theme.spacing(gutter)};
          box-sizing: border-box;
        }
      `}
  `
);

export const Row: React.FC<RowProps> = ({ gutter, children }) => {
  const row = gutter ? (
    <OuterRow gutter={gutter}>
      <InnerRow gutter={gutter}>{children}</InnerRow>
    </OuterRow>
  ) : (
    <InnerRow>{children}</InnerRow>
  );
  return row;
};
