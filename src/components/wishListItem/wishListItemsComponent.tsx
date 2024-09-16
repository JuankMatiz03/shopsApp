/** @jsxImportSource @emotion/react */
import React from 'react';
import { WishlistItemProps } from '../../models/wishlistItemProps';
import { buttonStyle, wishlistItemStyle } from './wishListItemStyles';

/**
 * WishlistItemComponent
 * @param param0 item, onRemove 
 * @returns Wish list Item Component
 */
const WishlistItemComponent: React.FC<WishlistItemProps> = ({ item, onRemove }) => {
  return (
    <div css={wishlistItemStyle}>
      <div>
        <h3>{item.title}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
      </div>
      <button css={buttonStyle} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default WishlistItemComponent;
