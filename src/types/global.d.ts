interface Window {
  gaData?: {
    [id: string]: {
      experiments: {
        [key: string]: '1' | '0';
      };
      hitcount: number;
    };
  };
  dataLayer: any[];
  Kakao: any;
  adsbygoogle: any[];
}
