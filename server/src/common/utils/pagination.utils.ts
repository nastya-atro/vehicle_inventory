// Contains methods to work with pagination

import { BadRequestException } from '@nestjs/common';

export enum Direction {
  ASC,
  DESC,
}

const ID_VALUE = 'id';
const DEFAULT_DIRECTION = 'ASC';
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

/**
 * Checks if provided field name is allowed to be sorted by.
 * If not, returns default field name for sort.
 * @param sortBy  field name for sort
 * @param allowedSortFields  set of allowed fields to sort by.
 * @returns {string}
 */
export const getSortByAllowed = (sortBy: string, allowedSortFields: object): string => {
  if (allowedSortFields.hasOwnProperty(sortBy)) {
    return allowedSortFields[sortBy];
  }
  throw new BadRequestException(`Invalid 'sortBy' value`);
};

/**
 * Check sortBy field.
 * If not, returns default field name for sort.
 * @param sortBy  field name for sort
 * @returns {string}
 */
export const getSortBy = (sortBy: string): string => (sortBy ? String(sortBy) : ID_VALUE);

/**
 * Check direction by field name.
 * If not, returns default field name for sort.
 * @param sortOrder
 * @returns {string}
 */
export const getDirection = (sortOrder: string): string => (Direction[sortOrder] ? sortOrder : DEFAULT_DIRECTION);

/**
 * Check limit field.
 * If not, returns default field name for limit.
 * @param limit
 * @param defaultLimit
 * @returns {number}
 */
export const getLimit = (limit: any, defaultLimit = DEFAULT_LIMIT) => Math.abs(parseInt(limit, 10)) || defaultLimit;

/**
 * Check page field.
 * If not, returns default field name for page.
 * @param page
 * @returns {number}
 */
export const getPage = (page: any): number => Math.abs(parseInt(page, 10)) || DEFAULT_PAGE;

/**
 * Calculate offset by page and limit.
 * @param limit
 * @param page
 * @returns {number}
 */
export const calculateOffset = (limit: number, page: number): number => limit * (page - 1);
