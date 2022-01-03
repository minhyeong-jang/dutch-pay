/* global dataLayer */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useEffect } from 'react';

interface Props {
  slotNumber: number;
}
export const AdsenseSection: FC<Props> = ({ slotNumber }) => {
  useEffect(() => {
    // window.dataLayer = window.dataLayer || [];
    // dataLayer.push({ js: new Date() });
    // dataLayer.push({ config: 'G-NFG3T2D585' });
    // adsbygoogle = window.adsbygoogle || [];
    // adsbygoogle.push({});
  }, [slotNumber]);
  return (
    <ins
      className="adsbygoogle"
      data-ad-client="ca-pub-6988376755693780"
      data-ad-format="auto"
      data-ad-slot={slotNumber}
      data-full-width-responsive="true"
    />
  );
};
