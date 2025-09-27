'use client';
import envConfig from '@/config/env.config';
import Turnstile, { useTurnstile } from 'react-turnstile';

type TurnstileWidgetProps = {
  onSuccess: (token: string) => void;
  onFail?: () => void;
};

const TurnstileWidget = ({ onSuccess, onFail }: TurnstileWidgetProps) => {
  const turnstile = useTurnstile();

  const handleVerify = (token: string) => {
    fetch('/api/cloudflare/turnstile', {
      body: JSON.stringify({ token }),
      method: 'POST',
    }).then((response) => {
      const status = response.status;

      if (status === 200) {
        onSuccess(token);
      } else {
        onFail?.();
        turnstile.reset();
      }
    });
  };
  return (
    <>
      <Turnstile
        sitekey={envConfig.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
        theme="light"
        size="flexible"
        language={'vi'}
        onVerify={handleVerify}
      />
    </>
  );
};

export default TurnstileWidget;
